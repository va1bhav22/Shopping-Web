import Head from 'next/head'
import Footer from './Footer'
import Header from './Header'

type Props = {
  title?: string
  children: JSX.Element[] | JSX.Element
}
export default function PublicLayout({ title, children }: Props) {
  return (
    <>
      <Head>
        <title>{title}</title>
        <link rel="icon" href="/favicon.png" />
      </Head>
      <main>
        <Header />
        {children}
        <Footer />
      </main>
    </>
  )
}
