import PageNumbersSection from '../../components/PageNumbersSection/PageNumbersSection';
import BookList from '../../components/BookList/BookList';
import { useRouter } from 'next/router';
import type { InferGetServerSidePropsType, GetServerSideProps } from 'next';
import { IBook, IData } from '@/interfaces';

interface IResultSectionProps {
  numFound: number;
  books: IBook[];
}

export default function ResultSection({
  numFound, books
}: IResultSectionProps) {
  const router = useRouter();

  const searchQuery = router.query.q as string;
  const booksPerPage = router.query.limit as string;
  const curentPage = router.query.num as string;

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
          <BookList books={books} curentPage={curentPage} />
        </div>
      </div>
    );
  } else {
    return <h2> Nothing found! </h2>;
  }
}