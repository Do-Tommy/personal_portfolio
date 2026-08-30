import '@/styles/globals.css'
import '@designcodeio/threeui/style.css'
import Header from '@/components/Header'
import Head from 'next/head'
import dynamic from 'next/dynamic'
import { siteMeta } from '@/lib/siteMeta'

const CanopyNetwork = dynamic(() => import('@/components/CanopyNetwork'), {
  ssr: false,
})

export default function App({ Component, pageProps }) {
  return (
    <>
      <Head>
        <title>{siteMeta.title}</title>
        <meta name="description" content={siteMeta.description} />
      </Head>
      <div className="min-h-screen bg-background text-text antialiased">
        <CanopyNetwork />
        <Header />
        <Component {...pageProps} />
      </div>
    </>
  )
}
