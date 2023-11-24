import DetailsSection from './DetailsSection';
import { useRouter } from 'next/router';
import type { InferGetServerSidePropsType, GetServerSideProps } from 'next';
import { IData } from '@/interfaces';
import { BASE_URL } from '@/utils/const';
import { encode } from 'querystring';

type Props = {
  params: {
    key: string;
  };
};

export const getServerSideProps = (async (context) => {
  // const searchQuery = context.query.q;
  // const booksPerPage = context.query.limit;
  // const curentPage = context.query.num;
  const { query } = context;
  const params = encode(query);

  // const params = context.params as string;

  console.log('context', context);

  const url = BASE_URL + `works/${params}.json`;
  const res = await fetch(url);
  const data = await res.json();

  if (!data) {
    return {
      notFound: true,
    };
  }

  return { props: { data } };
}) satisfies GetServerSideProps<{
  data: IData;
}>;

export default function BookDetails({
  data,
}: InferGetServerSidePropsType<typeof getServerSideProps>) {
  const router = useRouter();

  if (data) {
    return (
      <div className="col">
        <DetailsSection bookDetails={data} />
      </div>
    );
  } else {
    return (
      <div className="col">
        <h2> Nothing found, try again! </h2>
      </div>
    );
  }
}
