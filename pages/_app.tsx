import '../styles/globals.css';
import type { AppProps } from 'next/app';
import { ThemeProvider } from 'next-themes';
import Head from 'next/head';
import { Open_Sans } from '@next/font/google';

const openSans = Open_Sans({
  subsets: ['latin'],
});

export default function App({ Component, pageProps }: AppProps) {
  return (
    <>
      <Head>
        <title>Tickersaver - Save your tickers!</title>
      </Head>
      <ThemeProvider enableSystem={true} attribute="class">
        <style jsx global>{`
          html {
            font-family: ${openSans.style.fontFamily};
          }
        `}</style>
        <Component {...pageProps} />
      </ThemeProvider>
    </>
  );
}
