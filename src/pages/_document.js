import { Html, Head, Main, NextScript } from 'next/document'
import { absoluteUrl, siteMeta } from '@/lib/siteMeta'

export default function Document() {
  const ogImage = absoluteUrl(siteMeta.ogImagePath)

  return (
    <Html lang="en" className="scroll-smooth dark">
      <Head>
        <link rel="shortcut icon" href="/icon.png" />
        <meta name="description" content={siteMeta.description} />
        <meta property="og:type" content="website" />
        <meta property="og:site_name" content={siteMeta.siteName} />
        <meta property="og:locale" content={siteMeta.locale} />
        <meta property="og:url" content={siteMeta.siteUrl} />
        <meta property="og:title" content={siteMeta.title} />
        <meta property="og:description" content={siteMeta.description} />
        <meta property="og:image" content={ogImage} />
        <meta property="og:image:alt" content={siteMeta.ogImageAlt} />
        <meta name="twitter:card" content="summary_large_image" />
        <meta name="twitter:url" content={siteMeta.siteUrl} />
        <meta name="twitter:title" content={siteMeta.title} />
        <meta name="twitter:description" content={siteMeta.description} />
        <meta name="twitter:image" content={ogImage} />
        <meta name="twitter:image:alt" content={siteMeta.ogImageAlt} />
      </Head>
      <body className="bg-background text-text">
        <Main />
        <NextScript />
      </body>
    </Html>
  )
}
