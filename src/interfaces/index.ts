export interface IData {
  docs: IBook[];
  numFound: number;
}

export interface IBook {
  key: string;
  title: string;
  subtitle?: string;
  author_name?: string[];
  isbn?: string[];
  publisher?: string[];
  publish_place?: string[];
  publish_year?: number[];
  first_publish_year?: number;
  language?: string[];
  ebook_access?: string;
  has_fulltext?: boolean;
  person?: string[];
  seed?: string[];
}

export interface IBookProps {
  book: IBook;
}

export interface IPageNumbersSectionProps {
  numFound: string;
  curentPage: string;
  booksPerPage: string;
  searchQuery: string;
}

