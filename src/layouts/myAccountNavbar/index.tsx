import { useAuth } from 'hooks'
import Head from 'next/head'
import { useRouter } from 'next/router'
import { useEffect } from 'react'
import MyAccountNav from './MyAccountNav'

type Props = {
  title?: string
  children: JSX.Element
}

const MyAccountNavLayout = ({ title, children }: Props) => {
  const { user, isUserLoading } = useAuth()
  const { push } = useRouter()
  useEffect(() => {
    if (!isUserLoading && !user?._id) {
      push('/signin')
    }
  }, [user?._id, isUserLoading])
  return (
    <main className="bg-gray-100 py-16">
      <Head>
        <title>My Account | Prizen</title>
        <link rel="icon" href="/main_logo.png" />
      </Head>
      <section className="main-container flex justify-between gap-6">
        <div className="hidden w-1/4 md:block">
          <MyAccountNav />
        </div>
        <div className="w-full md:w-3/4">{children}</div>
      </section>
    </main>
  )
}

export default MyAccountNavLayout
