import { useEffect } from 'react';
import { useRouter } from 'next/router';
import Head from 'next/head';

const Error = () => {
  const router = useRouter();

  useEffect(() => {
    setTimeout(() => {
      router.push('/');
    }, 5000);
  }, [router]);

  return (
    <div>
      <Head>
        <title>Error</title>
      </Head>
      <div>
        <h1>404</h1>
        <h2>Something is going wrong...</h2>
      </div>
    </div>
  );
};

export default Error;
