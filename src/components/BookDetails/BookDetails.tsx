import { IBookDetailsProps } from '@/interfaces';
import { useRouter } from 'next/router';

export default function BookDetails({
  id,
  title,
  covers,
  curentPage,
}: IBookDetailsProps) {
  const router = useRouter();
  const searchQuery = router.query.q;
  const booksPerPage = router.query.limit;

  return (
    <div className="col">
      <div className="col">
        <div className="card w-100 open-card">
          <div className="card-body">
            {covers && covers.length > 0 ? (
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
                onClick={() => {
                  router.push({
                    pathname: `/${curentPage}`,
                    query: { q: searchQuery, limit: booksPerPage },
                  });
                }}
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
