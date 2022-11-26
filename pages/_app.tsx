import '../styles/globals.css';
import Head from 'next/head';
import type { AppProps } from 'next/app';
import { ThemeProvider } from 'next-themes';
import { Open_Sans } from '@next/font/google';
import { SessionProvider } from 'next-auth/react';
import { Header } from '../components/Header.components';

const openSans = Open_Sans({
  subsets: ['latin'],
});

export default function App({ Component, pageProps }: AppProps) {
  return (
    <>
      <Head>
        <title>Tickersaver - Save your tickers!</title>
      </Head>
      <SessionProvider session={pageProps.session}>
        <ThemeProvider enableSystem={true} attribute="class">
          <style jsx global>{`
            html {
              font-family: ${openSans.style.fontFamily};
            }
          `}</style>
          <Header />
          <Component {...pageProps} />
        </ThemeProvider>
      </SessionProvider>
    </>
  );
}
