import { Html, Head, Main, NextScript } from 'next/document'

export default function Document() {
  return (
    <Html>
      <Head>
        <link rel="preload" href="/fonts/CalSans-SemiBold.woff2" as="font" type="font/woff2" crossOrigin='' />
      </Head>
      <body>
        <Main />
        <script async data-api="/_hive" src="/bee.js"></script>
        <NextScript />
      </body>
    </Html>
  )
}