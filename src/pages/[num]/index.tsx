import PageNumbersSection from '../../components/PageNumbersSection/PageNumbersSection';
import BookList from '../../components/BookList/BookList';
import { useRouter } from 'next/router';
import type { InferGetServerSidePropsType, GetServerSideProps } from 'next';
import { IData } from '@/interfaces';
import { BASE_URL } from '@/utils/const';

export const getServerSideProps = (async (context) => {
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

  return { props: { data } };
}) satisfies GetServerSideProps<{
  data: IData;
}>;

export default function ResultSection({
  data,
}: InferGetServerSidePropsType<typeof getServerSideProps>) {
  const router = useRouter();

  const searchQuery = router.query.q as string;
  const booksPerPage = router.query.limit as string;
  const curentPage = router.query.num as string;

  if (data && data.docs && data.numFound) {
    return (
      <div>
        <PageNumbersSection
          numFound={data.numFound}
          curentPage={curentPage}
          booksPerPage={booksPerPage}
          searchQuery={searchQuery}
        />
        <div className="row">
          <BookList books={data.docs} curentPage={curentPage} />
        </div>
      </div>
    );
  } else {
    return <h2> Nothing found! </h2>;
  }
}
