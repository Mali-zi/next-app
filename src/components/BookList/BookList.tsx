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
        {books.map((book) => {
          const str = book.key.split('/');
          console.log('str', str);

          return (
            <li key={str[2]} data-testid="list-item">
              <Link href={`/${curentPage}/${str[2]}`}>
                <Book book={book} />
              </Link>
            </li>
          );
        })}
      </ul>
    </div>
  );
}
