import type { InferGetServerSidePropsType, GetServerSideProps } from 'next';
import { IBook } from '@/interfaces';
import { BASE_URL } from '@/utils/const';
import ResultSection from '@/components/ResultSection/ResultSection';

interface IProps {
  numFound: number;
  books: IBook[];
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

  if (data) {
    return {
      props: { numFound: data.numFound, books: data.docs },
    };
  }

  return { notFound: true };
};

export default function Page({
  numFound,
  books,
}: InferGetServerSidePropsType<typeof getServerSideProps>): JSX.Element {

  localStorage.setItem('numFound', JSON.stringify(numFound));
  localStorage.setItem('books', JSON.stringify(books));

  return (
    <div>
      <ResultSection />
    </div>
  );
}
