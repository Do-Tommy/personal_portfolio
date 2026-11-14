import '@fontsource-variable/fraunces/opsz.css'
import '@fontsource-variable/lexend/wght.css'
import '@/styles/globals.css'
import '@designcodeio/threeui/style.css'
import Header from '@/components/Header'
import Head from 'next/head'
import dynamic from 'next/dynamic'
import { useRouter } from 'next/router'
import { absoluteUrl, siteMeta } from '@/lib/siteMeta'

const CanopyNetwork = dynamic(() => import('@/components/CanopyNetwork'), {
  ssr: false,
})

export default function App({ Component, pageProps }) {
  const { pathname } = useRouter()
  return (
    <>
      <Head>
        <title>{siteMeta.title}</title>
        <meta name="description" content={siteMeta.description} />
        <link rel="canonical" href={absoluteUrl(pathname)} />
      </Head>
      <div className="min-h-screen overflow-x-clip bg-background text-text antialiased">
        <a
          href="#main"
          className="sr-only focus:not-sr-only focus:fixed focus:left-4 focus:top-4 focus:z-[60] focus:rounded-full focus:bg-accent focus:px-5 focus:py-3 focus:text-sm focus:font-semibold focus:text-[#06201b]"
        >
          Skip to content
        </a>
        <CanopyNetwork />
        <Header />
        <Component {...pageProps} />
      </div>
    </>
  )
}
