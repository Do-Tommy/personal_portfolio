import '@/styles/globals.css'
import Header from '@/components/Header'
import { DarkModeToggle } from '@/components/DarkModeToggle'


export default function App({ Component, pageProps }) {
  return ( 
    <>
          <Header/>
          <DarkModeToggle/>
          <Component {...pageProps} />
          <title>Tommy Do</title>
          </>
  )
}
