import { useState } from 'react';
import { initialBooks } from './data/books';
import Header from './components/Header';
import Section from './components/Section';
import GenreFilter from './components/GenreFilter';
import BookList from './components/BookList';
import Footer from './components/Footer';
import './App.css';

export default function App() {
  const [books] = useState(initialBooks);
  const [favoriteIds, setFavoriteIds] = useState([]);
  const [selectedGenre, setSelectedGenre] = useState('ALL');
  const [theme, setTheme] = useState('light');

  const genres = [...new Set(books.map((b) => b.genre))];

  const handleToggleFavorite = (bookId) => {
    setFavoriteIds((prev) =>
      prev.includes(bookId) ? prev.filter((id) => id !== bookId) : [...prev, bookId]
    );
  };

  const handleToggleTheme = () => {
    const next = theme === 'dark' ? 'light' : 'dark';
    setTheme(next);
    document.documentElement.setAttribute('data-theme', next);
  };

  const filteredBooks =
    selectedGenre === 'ALL'
      ? books
      : books.filter((b) => b.genre === selectedGenre);

  return (
    <div>
      <Header
        libraryName="Thư viện lớp học"
        favoriteCount={favoriteIds.length}
        theme={theme}
        onToggleTheme={handleToggleTheme}
      />

      <main className="container main-layout">
        <Section title="Thể loại">
          <GenreFilter
            genres={genres}
            selectedGenre={selectedGenre}
            onSelectGenre={setSelectedGenre}
          />
        </Section>

        <Section title={`Danh sách sách (${filteredBooks.length} / ${books.length} cuốn)`}>
          <BookList
            books={filteredBooks}
            favoriteIds={favoriteIds}
            onToggleFavorite={handleToggleFavorite}
          />
        </Section>
      </main>

      <Footer />
    </div>
  );
}
