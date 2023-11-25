import type { InferGetServerSidePropsType, GetServerSideProps } from 'next';
import { IBook, IDetailsProps } from '@/interfaces';
import { BASE_URL } from '@/utils/const';
import { ParsedUrlQuery } from 'querystring';
import BookDetails from '@/components/BookDetails/BookDetails';
import PageNumbersSection from '@/components/PageNumbersSection/PageNumbersSection';
import { useRouter } from 'next/router';
import Link from 'next/link';
import Book from '@/components/Book/Book';

interface Params extends ParsedUrlQuery {
  bkey: string;
}

export const getServerSideProps: GetServerSideProps<IDetailsProps> = async (
  context
) => {
  const { bkey } = context.params as Params;
  const url = BASE_URL + `works/${bkey}.json`;
  const res = await fetch(url);
  const data = await res.json();

  if (!data) {
    return {
      notFound: true,
    };
  }

  return { props: { data } };
};

export default function Details({
  data,
}: InferGetServerSidePropsType<typeof getServerSideProps>): JSX.Element {
  const router = useRouter();

  const id = data.key;
  const title = data.title;
  let covers: number[] = [];
  if (data.covers) {
    covers = data.covers;
  }
  const searchQuery = router.query.q as string;
  const booksPerPage = router.query.limit as string;
  const curentPage = router.query.num as string;
  const storedNumFound = localStorage.getItem('numFound');
  const storedBooks = localStorage.getItem('books');
  let books: IBook[] = [];
  let numFound: number = 0;
  if (storedBooks) {
    books = JSON.parse(storedBooks);
  }
  if (storedNumFound) {
    numFound = JSON.parse(storedNumFound);
  }

  const bookList = books.map((book) => {
    const str = book.key.split('/');

    return (
      <li key={str[2]} data-testid="list-item">
        <Link
          href={{
            pathname: `/${curentPage}/${str[2]}`,
            query: {
              q: searchQuery,
              limit: booksPerPage,
            },
          }}
        >
          <Book book={book} />
        </Link>
      </li>
    );
  });


  return (
    <div>
      <PageNumbersSection
        numFound={numFound.toString()}
        curentPage={curentPage}
        booksPerPage={booksPerPage}
        searchQuery={searchQuery}
      />
      <div className="row">
        <div className="col">
          <ul className="row row-cols-1 row-cols-sm-2 g-4">{bookList}</ul>
        </div>
        <BookDetails
          id={id}
          title={title}
          covers={covers}
          curentPage={curentPage}
        />
      </div>
    </div>
  );
}
