const FAV_KEY = 'favorite_books';
const THEME_KEY = 'theme_mode';

export function loadFavorites() {
  try {
    const raw = localStorage.getItem(FAV_KEY);
    return raw ? JSON.parse(raw) : [];
  } catch (e) {
    return [];
  }
}

export function saveFavorites(ids) {
  localStorage.setItem(FAV_KEY, JSON.stringify(ids));
}

export function toggleFavorite(id) {
  const current = loadFavorites();
  const strId = String(id);
  const next = current.includes(strId)
    ? current.filter(item => item !== strId)
    : [...current, strId];
  saveFavorites(next);
  return next;
}

export function loadTheme() {
  return localStorage.getItem(THEME_KEY) || 'light';
}

export function saveTheme(theme) {
  localStorage.setItem(THEME_KEY, theme);
}
