import { useAuth } from 'hooks'
import useFCMToken from 'hooks/useFCMToken'
import { useRouter } from 'next/router'
import { FC, useEffect } from 'react'
import { getLocalStorageItem } from 'utils'

const withAdmin = <T extends object>(WrappedComponent: FC<T>) => {
  const AuthComponent = ({ rest }: any) => {
    const router = useRouter()
    const authToken = getLocalStorageItem('CghRefreshToken')
    const { user } = useAuth()
    useFCMToken(user?._id)
    useEffect(() => {
      let isMounted = true
      if (!authToken && isMounted) {
        router.push('/signin')
      }
      return () => {
        isMounted = false
      }
    }, [router, authToken])

    useEffect(() => {
      let isMounted = true

      // console.log(authToken)
      // console.log(isMounted)

      if (
        Boolean(user?.role) === true &&
        authToken &&
        isMounted &&
        user?.role !== 'ADMIN' &&
        user?.role !== 'SELLER'
      ) {
        router.push('/not-found')
      }

      return () => {
        isMounted = false
      }
    }, [authToken, user?.role])

    return authToken && user?.role === 'ADMIN' ? (
      <WrappedComponent {...rest} />
    ) : authToken && user?.role === 'SELLER' ? (
      <WrappedComponent {...rest} />
    ) : null
  }
  return AuthComponent
}
export default withAdmin
