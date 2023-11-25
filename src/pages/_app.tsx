import 'bootstrap/dist/css/bootstrap.min.css'; // Import bootstrap CSS
import '@/styles/globals.css';
import type { AppProps } from 'next/app';
import Layout from '../components/Layout';
import { createContext, useState, useContext } from 'react';
import { IDataContext } from './[num]/[bkey]';

export const DataContext = createContext<IDataContext | null>(null);

export default function App({ Component, pageProps }: AppProps) {
  return (
    <Layout>
      <DataContext.Provider value={null}>
        <Component {...pageProps} />
      </DataContext.Provider>
    </Layout>
  );
}
