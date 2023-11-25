import type { InferGetServerSidePropsType, GetServerSideProps } from 'next';
import { IBookDetails, IBook } from '@/interfaces';
import { BASE_URL } from '@/utils/const';
import { ParsedUrlQuery } from "querystring";
import DataContext from '@/components/ResultSection/ResultSection';
import ResultSection from '@/components/ResultSection/ResultSection';
import { useContext } from 'react';
import BookDetails from '@/components/BookDetails/BookDetails';

interface Params extends ParsedUrlQuery {
  key: string;
}

interface IDetailsProps {
  key: string;
  title: string;
  covers?: number[];
}

interface IDataContext {
  numFound: number;
  books: IBook[]
}


export const getServerSideProps: GetServerSideProps<IDetailsProps> = (async (context) => {
  const { num, key } = context.params as Params;

  console.log('context', context);

  const url = BASE_URL + `works/${key}.json`;
  const res = await fetch(url);
  const data = await res.json();

  if (!data) {
    return {
      notFound: true,
    };
  }

  return { props: { key: data.key, title: data.title, covers: data.covers } };
});

export default function Details({
  key, title, covers
}: InferGetServerSidePropsType<typeof getServerSideProps>): JSX.Element {
  // const books = useContext(DataContext);
  const books = useContext<IDataContext>(DataContext);
  return (
    <div className="row">
      <ResultSection numFound={numFound} books={books} />
      <BookDetails key={key} title={title} covers={covers} />
    </div>
  );
}
