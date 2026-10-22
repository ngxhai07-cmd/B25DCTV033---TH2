import { Book, BookFormInput, ValidationErrors } from './types.js';

export function validateBookFormTS(data: BookFormInput): { isValid: boolean; errors: ValidationErrors } {
  const currentYear: number = new Date().getFullYear();
  const yearNum: number = Number(data.publishedYear);

  const errors: ValidationErrors = {
    title: data.title.trim().length >= 3 ? '' : 'Tên sách phải từ 3 ký tự trở lên.',
    author: data.author.trim() ? '' : 'Tác giả bắt buộc nhập.',
    genre: data.genre ? '' : 'Vui lòng chọn thể loại.',
    publishedYear:
      data.publishedYear.trim() && Number.isInteger(yearNum) && yearNum >= 1900 && yearNum <= currentYear
        ? ''
        : `Năm phải từ 1900 đến ${currentYear}.`
  };

  const isValid = Object.values(errors).every((msg: string) => msg === '');
  return { isValid, errors };
}

export function extractUniqueGenresTS(books: Book[]): string[] {
  return [...new Set(books.map((b: Book) => b.genre))];
}
