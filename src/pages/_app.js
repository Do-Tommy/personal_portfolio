import '@/styles/globals.css'
import '@designcodeio/threeui/style.css'
import Header from '@/components/Header'
import Head from 'next/head'
import dynamic from 'next/dynamic'

const CanopyNetwork = dynamic(() => import('@/components/CanopyNetwork'), {
  ssr: false,
})

export default function App({ Component, pageProps }) {
  return (
    <>
      <Head>
        <title>Tommy Do | Network Engineer</title>
        <meta
          name="description"
          content="Tommy Do — Network Engineer. Bare metal, routing, observability, and automation."
        />
      </Head>
      <div className="min-h-screen bg-background text-text antialiased">
        <CanopyNetwork />
        <Header />
        <Component {...pageProps} />
      </div>
    </>
  )
}
