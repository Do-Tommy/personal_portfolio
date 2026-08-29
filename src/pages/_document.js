import { Html, Head, Main, NextScript } from 'next/document'

export default function Document() {
  return (
    <Html lang="en" className="scroll-smooth dark">
      <Head>
        <link rel="shortcut icon" href="/static/icon.png" />
        <meta
          name="description"
          content="Tommy Do — Network Engineer. Bare metal, routing, observability, and automation."
        />
        <meta property="og:type" content="website" />
        <meta property="og:url" content="https://www.tommydo.dev/" />
        <meta property="og:title" content="Tommy Do | Network Engineer" />
        <meta
          property="og:description"
          content="Tommy Do — Network Engineer. Bare metal, routing, observability, and automation."
        />
        <meta property="og:image" content="/metaImage.png" />
        <meta property="twitter:card" content="summary_large_image" />
        <meta property="twitter:url" content="https://www.tommydo.dev/" />
        <meta property="twitter:title" content="Tommy Do | Network Engineer" />
        <meta
          property="twitter:description"
          content="Tommy Do — Network Engineer. Bare metal, routing, observability, and automation."
        />
        <meta property="twitter:image" content="/metaImage.png" />
      </Head>
      <body className="bg-background text-text">
        <Main />
        <NextScript />
      </body>
    </Html>
  )
}
