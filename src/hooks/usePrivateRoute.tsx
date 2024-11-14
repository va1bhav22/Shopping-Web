// import { Loader } from 'components/Core'
import { useRouter } from 'next/router'
import { useEffect, useRef } from 'react'
import useAuth from './useAuth'
import Swal from 'sweetalert2'
import { Loader } from 'components/core'
import myProductContext from 'contexts/myProductContext'

const usePrivateRoute = (PrivateComponent: any) =>
  function NewComponent(props: any) {
    const { user, isUserLoading } = useAuth()
    const { push, asPath } = useRouter()

    const { setIsPrivateRoute } = myProductContext()
    let mounted = useRef<boolean>(false)

    useEffect(() => {
      ;(() => {
        mounted.current = true
        if (isUserLoading || !mounted?.current) return
        if (!user?._id) {
          setIsPrivateRoute(true)
          //   setShowLoginForm(true)
          push('/signin')
        }
      })()
      return () => {
        mounted.current = false
      }
    }, [isUserLoading, user, push, asPath])

    useEffect(() => {
      mounted.current = true
      ;(() => {
        if (
          isUserLoading ||
          user?.blockStatus !== 'BLOCKED' ||
          !mounted?.current
        )
          return

        let inProfile = Boolean(asPath?.split('/')[1] === 'my-account')

        if (inProfile) return

        Swal.fire({
          icon: 'error',
          title: 'Error',
          text: 'User is blocked',
        })

        push('/')
      })()
      return () => {
        mounted.current = false
      }
    }, [isUserLoading, user?.blockStatus, push, asPath])

    return (
      <>
        {/* <Loader visible={!user?._id} /> */}
        <PrivateComponent {...props} />
      </>
    )
  }

export default usePrivateRoute
