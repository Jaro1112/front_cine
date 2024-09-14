import '@/styles/globals.css'
import 'bootstrap/dist/css/bootstrap.min.css'
import type { AppProps } from 'next/app'
import { useEffect } from 'react'
import Navbar from '../components/Navbar'

export default function App({ Component, pageProps }: AppProps) {
  useEffect(() => {
    require('bootstrap/dist/js/bootstrap.bundle.min.js')
  }, [])

  return (
    <>
      <Navbar />
      <Component {...pageProps} />
    </>
  )
}
