import Link from 'next/link';
import Book from '../Book/Book';
import { IBook } from '@/interfaces';

interface IBookListProps {
  books: IBook[];
  curentPage: string;
}

export default function BookList({ books, curentPage }: IBookListProps) {
  return (
    <div className="col">
      <ul className="row row-cols-1 row-cols-sm-2 g-4">
        {books.map((book) => (
          <li key={book.key} data-testid="list-item">
            <Link key={book.key} href={`/${curentPage}${book.key}`}>
              <Book book={book} />
            </Link>
          </li>
        ))}
      </ul>
    </div>
  );
}
