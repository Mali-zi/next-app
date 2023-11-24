import { useRouter } from 'next/router';
import type { InferGetServerSidePropsType, GetServerSideProps } from 'next';
import { IBookDetails, IData } from '@/interfaces';
import { BASE_URL } from '@/utils/const';
import { encode } from 'querystring';
import DetailsSection from '@/components/BookDetails/DetailsSection';
import { ParsedUrlQuery } from "querystring";

interface Params extends ParsedUrlQuery {
  key: string;
}

// type IParams = {
//   params: {
//     num: string;
//     key: string;
//   };
// };

export const getServerSideProps = (async (context) => {
  // const searchQuery = context.query.q;
  // const booksPerPage = context.query.limit;
  // const curentPage = context.query.num;
  const { num, key } = context.params as Params;
  // const params = context.params as string;

  console.log('context', context);

  const url = BASE_URL + `works/${key}.json`;
  const res = await fetch(url);
  const data = await res.json();

  if (!data) {
    return {
      notFound: true,
    };
  }

  return { props: { data } };
}) satisfies GetServerSideProps<{
  data: IBookDetails;
}>;

export default function BookDetails({
  data,
}: InferGetServerSidePropsType<typeof getServerSideProps>) {
  const router = useRouter();
  console.log('data', data);
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
