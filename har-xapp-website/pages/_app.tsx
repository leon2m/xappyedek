import type { AppProps } from 'next/app'
import '../app/globals.css' // Global CSS'i import ediyoruz

export default function App({ Component, pageProps }: AppProps) {
  return (
    <>
      <Component {...pageProps} />
    </>
  )
} 