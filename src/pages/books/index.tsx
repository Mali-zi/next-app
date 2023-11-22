import Head from "next/head";
import Link from "next/link";

export const getStaticProps = async () => {
  const response = await fetch('https://jsonplaceholder.typicode.com/posts');
  const data = await response.json();

  if (!data) {
    return {
      notFound: true,
    }
  }

  return {
    books: { posts: data },
  }
};

const Books = ({ books }) => { 
  return (
    <>
      <Head>
        <title>Books</title>
      </Head>
      <ul>
        {books && books.map(({ key, title }) => (
          <li key={key}>
            <Link href={`/books/${key}`}>{title}</Link>
          </li>
        ))}
      </ul>
    </>
  );
};

export default Books;