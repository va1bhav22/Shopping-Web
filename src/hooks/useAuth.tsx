import { BASE_URL, put } from 'api'
import { useRouter } from 'next/router'
import User from 'types/user'
import {
  getLocalStorageItem,
  removeFromLocalStorage,
  saveToLocalStorage,
} from 'utils'
import create from 'zustand'

type AuthState = {
  isUserLoading: boolean
  user?: Partial<User>
  setUser: (user: Partial<User>) => Promise<void>
  logOut: () => Promise<void>
  getUser: (token?: string) => Promise<void>
}
const useAuth = create<AuthState>((set) => ({
  isUserLoading: true,
  user: {},
  setUser: async (user: Partial<User>) => {
    set({ user: { ...user } })
  },
  logOut: async () => {
    await put({
      path: `/auth/logout`,
      headers: {
        'Content-Type': 'application/json',
      },
    })
    set({ user: {} })
    removeFromLocalStorage('CghRefreshToken')
    removeFromLocalStorage('CghAccessToken')
    removeFromLocalStorage('CGHAccessToken')
    window.location.replace('/signin')
  },
  getUser: async (token?: string) => {
    const authToken = getLocalStorageItem('CghRefreshToken')
    const accessToken = getLocalStorageItem('CghAccessToken')
    console.log('authToken', authToken)
    console.log('accessToken', accessToken)
    try {
      const res = await fetch(`${BASE_URL}/user/my-account`, {
        method: 'GET',
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${accessToken}`,
        },
      })
      if (res?.status === 401) {
        const getResponse = await fetch(`${BASE_URL}/auth/get-access-token`, {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
            // Authorization: `Bearer ${authToken}`,
          },
          body: JSON.stringify({
            refresh_token: authToken,
          }),
        })
        const getResponseData = await getResponse.json()
        saveToLocalStorage('CghAccessToken', getResponseData?.ACCESS_TOKEN)
        if (getResponse?.status === 200) {
          const getDataAgain = await fetch(`${BASE_URL}/user/my-account`, {
            method: 'GET',
            headers: {
              'Content-Type': 'application/json',
              Authorization: `Bearer ${getResponseData?.ACCESS_TOKEN}`,
            },
          })
          if (getDataAgain?.status === 200) {
            const data = await getDataAgain.json()
            set({
              user: {
                ...data?.data,
                token: getResponseData?.ACCESS_TOKEN,
              },
              isUserLoading: false,
            })
          } else {
            window?.localStorage?.removeItem('CGHAccessToken')
            window?.localStorage?.removeItem('CghRefreshToken')
            window?.localStorage?.removeItem('CghAccessToken')
            // window.location.href='/signin'
            useRouter().push('/signin')
          }
        } else {
          window?.localStorage?.removeItem('CGHAccessToken')
          window?.localStorage?.removeItem('CghRefreshToken')
          window?.localStorage?.removeItem('CghAccessToken')
          set({ user: {}, isUserLoading: false })
          useRouter().push('/signin')

          // window.location.reload()
          // window.location.href = '/signin'
          // console.log(getResponse)
        }
      }
      if (res?.status === 200) {
        const data = await res.json()
        set({ user: { ...data?.data }, isUserLoading: false })
        // console.log(data)
      }
      // else{
      //   window?.localStorage?.removeItem('CGHAccessToken')
      //   window?.localStorage?.removeItem('CghRefreshToken')
      //   window?.localStorage?.removeItem('CghAccessToken')
      // }
      // console.log({ user: USER?.data })
    } catch (error) {
      set({ user: {} })
    }
  },
}))

export default useAuth
