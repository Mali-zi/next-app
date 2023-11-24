import { useRouter } from 'next/router';
import { useEffect } from 'react';

function Home() {
  const router = useRouter();

  useEffect(() => {
    // Always do navigations after the first render
    router.push({
      pathname: '/1',
      query: { q: '', limit: '20' },
    });
}, []);
}

export default Home;
