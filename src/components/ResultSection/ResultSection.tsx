import PageNumbersSection from '../../components/PageNumbersSection/PageNumbersSection';
import { useRouter } from 'next/router';
import { IBook } from '@/interfaces';
import Link from 'next/link';
import Book from '../Book/Book';

export default function ResultSection() {
  const router = useRouter();

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
    console.log('str', str);

    return (
      <li key={str[2]} data-testid="list-item">
        <Link
          href={{
            pathname: `/${curentPage}/${str[2]}`,
            query: {
              searchQuery: searchQuery,
              booksPerPage: booksPerPage,
              curentPage: curentPage,
            },
          }}
        >
          <Book book={book} />
        </Link>
      </li>
    );
  });

  if (books && numFound) {
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
        </div>
      </div>
    );
  } else {
    return <h2> Nothing found! </h2>;
  }
}
