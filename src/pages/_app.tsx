import { ChakraProvider } from '@chakra-ui/react';
import { AppProps } from 'next/app';
import { system } from '@/theme/config';
import { QueryClientProvider } from '@tanstack/react-query';
import { client } from '@/api/hooks';
import { NextPage } from 'next';
import { ReactNode } from 'react';
import Head from 'next/head';
import { ThemeProvider } from 'next-themes';

import '@/styles/global.css';
import 'react-calendar/dist/Calendar.css';
import '@/styles/date-picker.css';

export type NextPageWithLayout = NextPage & {
  getLayout?: (children: ReactNode) => ReactNode;
};

type AppPropsWithLayout = AppProps & {
  Component: NextPageWithLayout;
};

export default function App({ Component, pageProps }: AppPropsWithLayout) {
  const getLayout = Component.getLayout ?? ((c) => c);

  return (
    <ChakraProvider value={system}>
      <ThemeProvider attribute="class" disableTransitionOnChange>
        <QueryClientProvider client={client}>
          <Head>
            <title>Demo Bot</title>
          </Head>
          {getLayout(<Component {...pageProps} />)}
        </QueryClientProvider>
      </ThemeProvider>
    </ChakraProvider>
  );
}
