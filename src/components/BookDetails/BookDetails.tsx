import { useRouter } from 'next/router';

interface IDetailsProps {
  id: string;
  title: string;
  covers?: number[];
  curentPage: string;
}

export default function BookDetails({
  id,
  title,
  covers,
  curentPage,
}: IDetailsProps) {
  const router = useRouter();

  return (
    <div className="col">
      <div className="col">
        <div className="card w-100 open-card">
          <div className="card-body">
            {covers ? (
              <img
                src={`https://covers.openlibrary.org/b/id/${String(
                  covers[0]
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
              {title ? title : ' unspecified'}
            </h5>
            <h6 className="card-subtitle mb-2 text-body-secondary">
              Key: {id}
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
    </div>
  );
}
