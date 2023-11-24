import type { NextApiRequest, NextApiResponse } from 'next';

type Data = {
  name: string;
};

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {

  try {
    const res = await fetch('https://jsonplaceholder.typicode.com/posts');
    const data = await res.json();
    res.redirect(200, '/1');
  } catch (err) {
    res.status(500).send({ error: 'Failed to fetch data' });
  }
}
