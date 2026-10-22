export default function BookCard({ book, isFavorite, onToggleFavorite }) {
  return (
    <article className="book-card">
      <div>
        <div className="book-meta">
          <span className="book-code">Mã: {book.id}</span>
          <span className="book-genre">{book.genre}</span>
        </div>
        <h3 className="book-title">{book.title}</h3>
        <p className="book-author">Tác giả: {book.author}</p>
        <p className="book-year">Năm XB: {book.publishedYear}</p>
      </div>
      <div className="card-actions">
        <button
          type="button"
          className={`btn btn-fav ${isFavorite ? 'active' : ''}`}
          onClick={() => onToggleFavorite(book.id)}
        >
          {isFavorite ? 'Đã thích' : 'Yêu thích'}
        </button>
      </div>
    </article>
  );
}
