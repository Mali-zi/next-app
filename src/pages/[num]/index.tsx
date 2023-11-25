import PageNumbersSection from '../../components/PageNumbersSection/PageNumbersSection';
import BookList from '../../components/BookList/BookList';
import { useRouter } from 'next/router';
import type { InferGetServerSidePropsType, GetServerSideProps } from 'next';
import { IBook, IData } from '@/interfaces';
import { BASE_URL } from '@/utils/const';
import ResultSection from '@/components/ResultSection/ResultSection';
import { createContext, useState, useContext } from 'react';

interface IProps {
  numFound: number;
  books: IBook[];
}

interface IDataContext {
  numFound: number;
  books: IBook[]
}

export const getServerSideProps: GetServerSideProps<IProps> = async (
  context
) => {
  const searchQuery = context.query.q;
  const booksPerPage = context.query.limit;
  const curentPage = context.query.num;

  const url =
    BASE_URL +
    `search.json?q=${searchQuery}&author=conan%20doyle&offset=${(
      (Number(curentPage) - 1) *
      Number(booksPerPage)
    ).toString()}&limit=${booksPerPage}`;
  const res = await fetch(url);
  const data = await res.json();

  if (!data) {
    return {
      notFound: true,
    };
  }

  return { props: { numFound: data.numFound, books: data.docs } };
};

const DataContext = createContext<IDataContext | null>(null);

export default function Page({
  numFound,
  books,
}: InferGetServerSidePropsType<typeof getServerSideProps>): JSX.Element {
  // const numFound = data.numFound;
  // const books = data.docs;
  return (
    <div>
      <DataContext.Provider value={{ numFound, books }}>
        <ResultSection />
      </DataContext.Provider>
    </div>
  );
}

// export default function ResultSection({
//   data,
// }: InferGetServerSidePropsType<typeof getServerSideProps>) {
//   const router = useRouter();

//   const searchQuery = router.query.q as string;
//   const booksPerPage = router.query.limit as string;
//   const curentPage = router.query.num as string;

//   if (data && data.docs && data.numFound) {
//     return (
//       <div>
//         <PageNumbersSection
//           numFound={data.numFound}
//           curentPage={curentPage}
//           booksPerPage={booksPerPage}
//           searchQuery={searchQuery}
//         />
//         <div className="row">
//           <BookList books={data.docs} curentPage={curentPage} />
//         </div>
//       </div>
//     );
//   } else {
//     return <h2> Nothing found! </h2>;
//   }
// }
