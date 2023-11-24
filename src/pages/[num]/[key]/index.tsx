import DetailsSection from '../../../components/BookDetails/DetailsSection';

type Props = {
  params: {
    key: string;
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
