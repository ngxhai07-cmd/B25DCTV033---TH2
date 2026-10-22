export default function GenreFilter({ genres, selectedGenre, onSelectGenre }) {
  return (
    <div style={{ display: 'flex', gap: '8px', flexWrap: 'wrap' }}>
      <button
        type="button"
        className={`btn ${selectedGenre === 'ALL' ? 'btn-primary' : 'btn-outline'}`}
        onClick={() => onSelectGenre('ALL')}
      >
        Tất cả
      </button>
      {genres.map((genre) => (
        <button
          key={genre}
          type="button"
          className={`btn ${selectedGenre === genre ? 'btn-primary' : 'btn-outline'}`}
          onClick={() => onSelectGenre(genre)}
        >
          {genre}
        </button>
      ))}
    </div>
  );
}
