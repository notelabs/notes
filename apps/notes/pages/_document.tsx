import { Html, Head, Main, NextScript } from 'next/document'

export default function Document() {
  return (
    <Html>
      <Head>
        <link rel="preload" href="/fonts/CalSans-SemiBold.woff2" as="font" type="font/woff2" crossOrigin='' />
      </Head>
      <body>
        <Main />
        <NextScript />
      </body>
    </Html>
  )
}