import Head from 'next/head'
import Image from 'next/image'
import { Inter } from 'next/font/google'

// import React from 'react';
import TopSection from '../components/TopSection';
// import ErrorBoundary from '../../components/ErrorBoundary';


const inter = Inter({ subsets: ['latin'] })

export default function Home() {
  return (
    <div className="container-fluid">
      <div className="row mt-4">
        <div className="col m-4 cover">
          {/* <ErrorBoundary> */}
            <TopSection />
          {/* </ErrorBoundary> */}
          Hello world
        </div>
      </div>
    </div>
  );
}
