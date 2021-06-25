import { AppProps } from 'next/app'
import Head from 'next/head'

import { ThemeProvider } from 'styled-components'

import GlobalStyles from 'styles/global'
import theme from 'styles/theme'

import { SessionProvider } from 'contexts/session'

function MyApp({ Component, pageProps }: AppProps) {
  return (
    <SessionProvider>
      <ThemeProvider theme={theme}>
        <Head>
          <title>Market</title>
          <base href="/" />
          <meta
            name="viewport"
            content="width=device-width, initial-scale=1.0, maximum-scale=1.0, user-scalable=no"
          />
          <link href="icons/favicon.ico" rel="icon" data-head-react="true" />

          <link
            rel="apple-touch-icon"
            sizes="180x180"
            href="icons/apple-touch-icon.png"
          />
          <link
            rel="icon"
            type="image/png"
            sizes="32x32"
            href="icons/favicon-32x32.png"
          />
          <link
            rel="icon"
            type="image/png"
            sizes="16x16"
            href="icons/favicon-16x16.png"
          />
          <meta name="theme-color" content="#90decb" />
          <meta name="description" content="Gestion de productos" />

          <link
            href="https://fonts.googleapis.com/css2?family=Roboto+Condensed:ital,wght@0,300;0,400;0,700;1,300;1,400;1,700&display=swap"
            rel="preload"
            as="style"
          />
        </Head>
        <GlobalStyles />
        <Component {...pageProps} />
      </ThemeProvider>
    </SessionProvider>
  )
}

export default MyApp
