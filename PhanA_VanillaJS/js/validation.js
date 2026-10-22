export function validateTitle(value) {
  const v = value.trim();
  if (!v) return 'Tên sách không được để trống';
  if (v.length < 3) return 'Tên sách phải từ 3 ký tự trở lên';
  return '';
}

export function validateAuthor(value) {
  if (!value.trim()) return 'Vui lòng nhập tên tác giả';
  return '';
}

export function validateGenre(value) {
  if (!value) return 'Vui lòng chọn thể loại';
  return '';
}

export function validateYear(value) {
  if (!String(value).trim()) return 'Vui lòng nhập năm xuất bản';
  const year = Number(value);
  const currentYear = new Date().getFullYear();
  if (!Number.isInteger(year) || year < 1900 || year > currentYear) {
    return `Năm xuất bản phải từ 1900 đến ${currentYear}`;
  }
  return '';
}

export function validateBookForm(data) {
  const errors = {
    title: validateTitle(data.title),
    author: validateAuthor(data.author),
    genre: validateGenre(data.genre),
    publishedYear: validateYear(data.publishedYear)
  };
  const isValid = Object.values(errors).every(msg => msg === '');
  return { isValid, errors };
}
