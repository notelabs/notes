import { ChakraProvider } from '@chakra-ui/react'
import type { AppProps } from 'next/app'
import { theme } from "config"
import "cal-sans"
import { SessionProvider } from 'next-auth/react'

function MyApp({ Component, pageProps }: AppProps) {
  return (
    <SessionProvider basePath='/app' baseUrl={process.env.NEXTAUTH_URL}>
      <ChakraProvider theme={theme}>
        <Component {...pageProps} />
      </ChakraProvider>
    </SessionProvider>
  )
}

export default MyApp