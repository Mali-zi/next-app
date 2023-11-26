import { useRouter } from 'next/router';
import React, { useState } from 'react';

export default function TopSection() {
  const router = useRouter();

  const [value, setValue] = useState('green');
  const [searchQuery, setSearchQuery] = useState('green');
  const [isValid, setIsValid] = useState(true);
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [booksPerPage, setBooksPerPage] = useState<string>('4');
  const booksPerPageArray: string[] = ['4', '6', '10'];

  function handleChange(e: React.ChangeEvent<HTMLInputElement>) {
    setValue(e.target.value);
    setIsSubmitted(false);
    setIsValid(true);
  }

  function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    const query = value.trim();
    if (query) {
      router.push({
        pathname: '/1',
        query: { q: query, limit: booksPerPage },
      });
      setSearchQuery(query);
      setIsValid(true);
      setIsSubmitted(true);
    } else {
      setIsValid(false);
    }
  }

  function handleBooksPerPage(e: React.ChangeEvent<HTMLSelectElement>) {
    setBooksPerPage(e.target.value);
    router.push({
      pathname: '/1',
      query: { q: searchQuery, limit: e.target.value },
    });
  }

  return (
    <>
      <section className="col-lg-6 col-md-12">
        <h2 className="planet-list-header">For Conan Doyle fans</h2>
        <div className="mb-3">
          <label className="form-label d-flex flex-column justify-content-start align-items-start fs-5 mb-4">
            Books Per Page:
            <select
              name="selectedNumber"
              id="selectedNumber"
              data-testid="selectedNumber"
              className="btn btn-secondary dropdown-toggle"
              value={booksPerPage}
              onChange={(e) => handleBooksPerPage(e)}
            >
              {booksPerPageArray.map((item, index) => (
                <option
                  key={index}
                  className="text-bg-light fs-5 p-2"
                  value={item}
                >
                  {item}
                </option>
              ))}
            </select>
          </label>
          <form onSubmit={(e) => handleSubmit(e)}>
            <label
              htmlFor="search-form"
              className="form-label d-flex flex-column justify-content-start align-items-start fs-5"
            >
              Search for your favorite books
              <div className="container-fluid d-flex p-0 align-items-stretch mt-2">
                <input
                  id="search-form"
                  data-testid="searchbox"
                  type="text"
                  name="searchbox"
                  className="form-control w-100 border-4 border-primary"
                  placeholder="Enter a search query"
                  autoFocus
                  value={value}
                  onChange={(e) => handleChange(e)}
                />
                <input
                  type="submit"
                  data-testid="submitButton"
                  className="btn btn-primary ms-2 flex-shrink-1"
                  value="Submit"
                />
              </div>
            </label>
          </form>
          {isSubmitted && <p className="text-success fs-5">Form submitted</p>}
          {!isValid && (
            <p className="text-danger fs-5">The query isn&apos;t valid</p>
          )}
        </div>
      </section>
      <hr />
    </>
  );
}
