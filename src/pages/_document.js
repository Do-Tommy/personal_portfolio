import { Html, Head, Main, NextScript } from 'next/document'
import useMediaQuery from '@/hooks/useMediaQuery'

export default function Document() {
  const isDesktop =  useMediaQuery("(min-width:768px)");

  return (
    
    <Html lang="en" className={"scroll-smooth " + (isDesktop ? '' : 'scroll-pt-32') }>
      <Head>     
        
        <link rel="shortcut icon" href="/static/icon.png"/>
        <meta name="title" content="Tommy Do" />
        <meta name="description" content="Tommy Do - Software Engineer New grad looking to build and create for the future" />

        
        <meta property="og:type" content="website" />
        <meta property="og:url" content="https://tommydo.vercel.app/" />
        <meta property="og:title" content="Tommy Do" />
        <meta property="og:description" content="Tommy Do - Software Engineer New grad looking to build and create for the future" />
        <meta property="og:image" content="/metaImage.png" />

       
        <meta property="twitter:card" content="summary_large_image" />
        <meta property="twitter:url" content="https://tommydo.vercel.app/" />
        <meta property="twitter:title" content="Tommy Do" />
        <meta property="twitter:description" content="Tommy Do - Software Engineer New grad looking to build and create for the future" />
        <meta property="twitter:image" content="/metaImage.png" />

        
      </Head>
      <body className='bg-background'>
        <Main />
        <NextScript />
      </body>
    </Html>

    
  )
}
//spy={true} offset={isDesktop ? -200 : -30} isDynamic={true} smooth={true}