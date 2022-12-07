import '../styles/globals.css';
import { Fragment, useEffect, useState } from 'react';
import Head from 'next/head';
import { Router } from 'next/router';
import type { AppProps } from 'next/app';
import { ThemeProvider } from 'next-themes';
import { Open_Sans } from '@next/font/google';
import { SessionProvider } from 'next-auth/react';
import {
  QueryClientProvider,
  QueryClient,
  Hydrate,
} from '@tanstack/react-query';
import { LoaderSpinner } from '../components/LoaderSpinner.components';
import { Header } from '../components/Header.components';
import { SearchErrorModal } from '../components/search/SearchErrorModal.components';
import { Layout } from '../components/Layout.components';

const openSans = Open_Sans({
  subsets: ['latin'],
  variable: '--font-openSans',
});

const queryClient = new QueryClient();

export default function App({ Component, pageProps }: AppProps) {
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    const start = () => {
      setLoading(true);
    };

    const end = () => {
      setLoading(false);
    };

    Router.events.on('routeChangeStart', start);
    Router.events.on('routeChangeComplete', end);
    Router.events.on('routeChangeError', end);

    return () => {
      Router.events.off('routeChangeStart', start);
      Router.events.off('routeChangeComplete', end);
      Router.events.off('routeChangeError', end);
    };
  }, []);

  return (
    <>
      <Head>
        <title>tickersaver - Save your tickers!</title>
      </Head>
      {loading ? (
        <LoaderSpinner />
      ) : (
        <main className={`${openSans.variable} font-sans`}>
          <SessionProvider session={pageProps.session}>
            <QueryClientProvider client={queryClient}>
              <Hydrate state={pageProps.dehydratedState}>
                <ThemeProvider enableSystem={true} attribute="class">
                  <Layout>
                    <Component {...pageProps} />
                  </Layout>
                </ThemeProvider>
              </Hydrate>
            </QueryClientProvider>
          </SessionProvider>
        </main>
      )}
    </>
  );
}
