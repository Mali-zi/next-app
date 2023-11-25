import { useRouter } from 'next/router';
import { useEffect } from 'react';

function Home() {
  const router = useRouter();

  useEffect(() => {
    router.push({
      pathname: '/1',
      query: { q: 'green', limit: '4' },
    });
}, []);
}

export default Home;
