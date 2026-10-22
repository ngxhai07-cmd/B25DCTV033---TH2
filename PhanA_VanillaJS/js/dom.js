export function createBookCardElement(book, isFav) {
  const article = document.createElement('article');
  article.className = 'book-card';
  article.dataset.id = String(book.id);

  const topDiv = document.createElement('div');

  const metaDiv = document.createElement('div');
  metaDiv.className = 'book-meta';

  const codeSpan = document.createElement('span');
  codeSpan.className = 'book-code';
  codeSpan.textContent = `Mã: ${book.id}`;

  const genreSpan = document.createElement('span');
  genreSpan.className = 'book-genre';
  genreSpan.textContent = book.genre;

  metaDiv.append(codeSpan, genreSpan);

  const titleEl = document.createElement('h3');
  titleEl.className = 'book-title';
  titleEl.textContent = book.title;

  const authorEl = document.createElement('p');
  authorEl.className = 'book-author';
  authorEl.textContent = `Tác giả: ${book.author}`;

  const yearEl = document.createElement('p');
  yearEl.className = 'book-year';
  yearEl.textContent = `Năm XB: ${book.publishedYear}`;

  topDiv.append(metaDiv, titleEl, authorEl, yearEl);

  const actionsDiv = document.createElement('div');
  actionsDiv.className = 'card-actions';

  const favBtn = document.createElement('button');
  favBtn.type = 'button';
  favBtn.className = `btn btn-fav ${isFav ? 'active' : ''}`;
  favBtn.dataset.action = 'favorite';
  favBtn.dataset.id = String(book.id);
  favBtn.textContent = isFav ? 'Đã thích' : 'Yêu thích';

  const delBtn = document.createElement('button');
  delBtn.type = 'button';
  delBtn.className = 'btn btn-delete';
  delBtn.dataset.action = 'delete';
  delBtn.dataset.id = String(book.id);
  delBtn.dataset.title = book.title;
  delBtn.textContent = 'Xóa';

  actionsDiv.append(favBtn, delBtn);
  article.append(topDiv, actionsDiv);

  return article;
}

export function renderBooksGrid(container, books, favoriteIds) {
  container.replaceChildren();
  const frag = document.createDocumentFragment();
  books.forEach(book => {
    const isFav = favoriteIds.includes(String(book.id));
    frag.appendChild(createBookCardElement(book, isFav));
  });
  container.appendChild(frag);
}

export function renderGenreOptions(selectEl, books, currentVal) {
  const genres = [...new Set(books.map(b => b.genre))].filter(Boolean);
  selectEl.replaceChildren();

  const allOpt = document.createElement('option');
  allOpt.value = 'ALL';
  allOpt.textContent = 'Tất cả';
  selectEl.appendChild(allOpt);

  genres.forEach(g => {
    const opt = document.createElement('option');
    opt.value = g;
    opt.textContent = g;
    selectEl.appendChild(opt);
  });

  if (genres.includes(currentVal) || currentVal === 'ALL') {
    selectEl.value = currentVal;
  }
}
