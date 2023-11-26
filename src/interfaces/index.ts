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

export interface IDetailsSection {
  bookDetails: IBookDetails;
}

export interface IBookDetails {
  key: string;
  title: string;
  covers?: number[];
  excerpts?: Excerpt[];
  subjects?: string[];
  links?: Link[];
}
export interface Type {
  key: string;
}

export interface Excerpt {
  excerpt: string;
}

export interface Link {
  url: string;
  title: string;
  type: Type;
}

export interface IBookDetailsProps {
  id: string;
  title: string;
  covers?: number[];
  curentPage: string;
}

export interface IDetailsProps {
  data: {
    key: string;
    title: string;
    covers: number[] | null;
  };
}

export interface IDataContext {
  numFound: number;
  books: IBook[];
}

export interface IProps {
  numFound: number;
  books: IBook[];
}



