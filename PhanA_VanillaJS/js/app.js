import { getBooks, addBookApi, deleteBookApi } from './api.js';
import { loadFavorites, toggleFavorite, saveFavorites, loadTheme, saveTheme } from './storage.js';
import { validateTitle, validateAuthor, validateGenre, validateYear, validateBookForm } from './validation.js';
import { renderBooksGrid, renderGenreOptions } from './dom.js';

let books = [];
let favoriteIds = loadFavorites();
let keyword = '';
let selectedGenre = 'ALL';

const gridEl = document.getElementById('book-grid');
const statusEl = document.getElementById('status-text');
const favCountEl = document.getElementById('fav-count');
const searchInput = document.getElementById('search-input');
const genreSelect = document.getElementById('genre-select');
const themeBtn = document.getElementById('theme-toggle');
const formEl = document.getElementById('add-book-form');

const titleInput = document.getElementById('title-input');
const authorInput = document.getElementById('author-input');
const genreInput = document.getElementById('genre-input');
const yearInput = document.getElementById('year-input');

function applyTheme(theme) {
  document.documentElement.setAttribute('data-theme', theme);
  themeBtn.textContent = theme === 'dark' ? 'Giao diện sáng' : 'Giao diện tối';
}

themeBtn.addEventListener('click', () => {
  const curr = document.documentElement.getAttribute('data-theme') || 'light';
  const next = curr === 'dark' ? 'light' : 'dark';
  applyTheme(next);
  saveTheme(next);
});

function updateDisplay() {
  const filtered = books.filter(b => {
    const matchName = b.title.toLowerCase().includes(keyword.toLowerCase());
    const matchGenre = selectedGenre === 'ALL' || b.genre === selectedGenre;
    return matchName && matchGenre;
  });

  renderBooksGrid(gridEl, filtered, favoriteIds);
  statusEl.textContent = `Đang hiển thị ${filtered.length} / ${books.length} cuốn`;
  favCountEl.textContent = String(favoriteIds.length);
}

searchInput.addEventListener('input', (e) => {
  keyword = e.target.value.trim();
  updateDisplay();
});

genreSelect.addEventListener('change', (e) => {
  selectedGenre = e.target.value;
  updateDisplay();
});

gridEl.addEventListener('click', async (e) => {
  const btn = e.target.closest('button[data-action]');
  if (!btn) return;
  const action = btn.dataset.action;
  const id = btn.dataset.id;

  if (action === 'favorite') {
    favoriteIds = toggleFavorite(id);
    updateDisplay();
  } else if (action === 'delete') {
    const title = btn.dataset.title || '';
    if (window.confirm(`Xác nhận xóa sách "${title}"?`)) {
      await deleteBookApi(id);
      books = books.filter(b => String(b.id) !== id);
      if (favoriteIds.includes(id)) {
        favoriteIds = favoriteIds.filter(fId => fId !== id);
        saveFavorites(favoriteIds);
      }
      renderGenreOptions(genreSelect, books, selectedGenre);
      updateDisplay();
    }
  }
});

function setFieldError(inputEl, errorElId, msg) {
  const errEl = document.getElementById(errorElId);
  if (errEl) errEl.textContent = msg;
  inputEl.classList.toggle('invalid', Boolean(msg));
}

titleInput.addEventListener('input', () => setFieldError(titleInput, 'title-error', validateTitle(titleInput.value)));
authorInput.addEventListener('input', () => setFieldError(authorInput, 'author-error', validateAuthor(authorInput.value)));
genreInput.addEventListener('change', () => setFieldError(genreInput, 'genre-error', validateGenre(genreInput.value)));
yearInput.addEventListener('input', () => setFieldError(yearInput, 'year-error', validateYear(yearInput.value)));

formEl.addEventListener('submit', async (e) => {
  e.preventDefault();
  const raw = {
    title: titleInput.value,
    author: authorInput.value,
    genre: genreInput.value,
    publishedYear: yearInput.value
  };
  const { isValid, errors } = validateBookForm(raw);
  setFieldError(titleInput, 'title-error', errors.title);
  setFieldError(authorInput, 'author-error', errors.author);
  setFieldError(genreInput, 'genre-error', errors.genre);
  setFieldError(yearInput, 'year-error', errors.publishedYear);

  if (!isValid) return;

  const created = await addBookApi({
    title: raw.title.trim(),
    author: raw.author.trim(),
    genre: raw.genre,
    publishedYear: Number(raw.publishedYear)
  });

  books.unshift(created);
  formEl.reset();
  renderGenreOptions(genreSelect, books, selectedGenre);
  updateDisplay();
});

async function init() {
  applyTheme(loadTheme());
  favCountEl.textContent = String(favoriteIds.length);
  statusEl.textContent = 'Đang tải…';
  try {
    books = await getBooks();
    renderGenreOptions(genreSelect, books, selectedGenre);
    updateDisplay();
  } catch (err) {
    statusEl.textContent = 'Lỗi khi tải dữ liệu sách';
  }
}

init();
