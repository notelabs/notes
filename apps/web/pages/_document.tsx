import { Html, Head, Main, NextScript } from 'next/document'

export default function Document() {
  return (
    <Html>
      <Head />
      <body>
        <Main />
        <script async data-api="/_hive" src="/bee.js"></script>
        <NextScript />
      </body>
    </Html>
  )
}