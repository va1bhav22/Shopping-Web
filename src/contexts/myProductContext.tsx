import { useAuth } from 'hooks'
import { createContext, useContext, useEffect, useState } from 'react'
import { getLocalStorageItem } from 'utils'

const AppContext = createContext({})

export const AppContextProvider = ({ children }: any) => {
  const [isLogin, setIsLogin] = useState(false)
  const [isPrivateRoute, setIsPrivateRoute] = useState(false)
  const { getUser, isUserLoading } = useAuth()
  const authToken = getLocalStorageItem('CghRefreshToken') as string
  // console.log(authToken)
  useEffect(() => {
    getUser(authToken)
  }, [])
  return (
    <AppContext.Provider
      value={{
        isLogin,
        setIsLogin,
        isUserLoading,
        isPrivateRoute,
        setIsPrivateRoute,
      }}
    >
      {children}
    </AppContext.Provider>
  )
}

const myProductContext = () => {
  const {
    isLogin,
    setIsLogin,
    isUserLoading,
    isPrivateRoute,
    setIsPrivateRoute,
  } = useContext<any>(AppContext)

  return {
    isLogin,
    setIsLogin,
    isUserLoading,
    isPrivateRoute,
    setIsPrivateRoute,
  }
}

export default myProductContext
