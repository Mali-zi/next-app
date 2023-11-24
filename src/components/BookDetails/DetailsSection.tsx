import { IDetailsSection } from '../../models';
import { useRouter } from 'next/router';

const DetailsSection = ({ bookDetails }: IDetailsSection) => {
  const router = useRouter();

  return (
    <div className="col">
      <div className="card w-100 open-card">
        <div className="card-body">
          {bookDetails.covers ? (
            <img
              src={`https://covers.openlibrary.org/b/id/${String(
                bookDetails.covers[0]
              )}-L.jpg`}
              className="card-img-top"
              alt="cover"
            />
          ) : (
            <h5 className="card-title text-danger">
              Sorry, the book cover was not provided
            </h5>
          )}
          <h5 className="card-title my-4">
            {bookDetails.title ? bookDetails.title : ' unspecified'}
          </h5>
          <h6 className="card-subtitle mb-2 text-body-secondary">
            Key: {bookDetails.key}
          </h6>
          <div className="card-body text-dark">
            <button
              type="button"
              data-testid="close"
              className="btn btn-primary"
              onClick={() => router.push(`/${curentPage}`)}
            >
              Close
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default DetailsSection;
