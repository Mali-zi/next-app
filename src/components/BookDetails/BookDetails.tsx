import React from 'react';
import DetailsSection from './DetailsSection';

type Props = {
  params: {
    key: string;
  };
};

export const getStaticProps = async () => {
  const response = await fetch('https://jsonplaceholder.typicode.com/posts');
  const data = await response.json();

  if (!data) {
    return {
      notFound: true,
    };
  }

  return {
    props: { books: data },
  };
};

export default function BookDetails({ params: { key } }) {
  if (isError) {
    return <h2>Oops! Something went wrong!</h2>;
  }

  if (detailsLoading || isFetching) {
    return (
      <div className="col">
        <h2 data-testid="loading">Loading...</h2>
      </div>
    );
  } else {
    if (bookDetails) {
      return (
        <div className="col">
          <DetailsSection bookDetails={bookDetails} />
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
}
