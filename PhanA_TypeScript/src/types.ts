export interface Book {
  id: string;
  title: string;
  author: string;
  genre: string;
  publishedYear: number;
}

export interface BookFormInput {
  title: string;
  author: string;
  genre: string;
  publishedYear: string;
}

export interface ValidationErrors {
  title: string;
  author: string;
  genre: string;
  publishedYear: string;
}
