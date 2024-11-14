import { Loader } from 'components/core'
import { AppContextProvider } from 'contexts/myProductContext'
import { useAuth } from 'hooks'
import type { AppProps } from 'next/app'
import Router from 'next/router'
import nProgress from 'nprogress'
import React from 'react'
import { SkeletonTheme } from 'react-loading-skeleton'
import 'react-loading-skeleton/dist/skeleton.css'
import '../styles/globals.css'
import 'slick-carousel/slick/slick-theme.css'
import 'slick-carousel/slick/slick.css'

Router.events.on('routeChangeStart', nProgress.start)
Router.events.on('routeChangeError', nProgress.done)
Router.events.on('routeChangeComplete', nProgress.done)

function MyApp({ Component, pageProps }: AppProps) {
  const [isLoading, setIsLoading] = React.useState(true)
  const { isUserLoading } = useAuth()

  // React.useEffect(() => {
  //   console.log({ user })
  //   // const timeOutFunc = setTimeout(() => {
  //   //   setIsLoading(false)
  //   // }, 1500)
  //   // return () => {
  //   //   clearTimeout(timeOutFunc)
  //   // }
  // }, [user])

  return (
    <AppContextProvider>
      <Loader visible={isUserLoading} />
      <SkeletonTheme baseColor="#f1f1f1" highlightColor="#E8E8E8">
        <Component {...pageProps} />
      </SkeletonTheme>
    </AppContextProvider>
  )
}

export default MyApp
