export default function Header({ libraryName, favoriteCount, theme, onToggleTheme }) {
  return (
    <header className="site-header">
      <div className="container header-inner">
        <h1 className="brand-title">{libraryName}</h1>
        <div className="header-controls">
          <button type="button" className="btn btn-outline" onClick={onToggleTheme}>
            {theme === 'dark' ? 'Giao diện sáng' : 'Giao diện tối'}
          </button>
          <div className="fav-counter">
            <span>Yêu thích: </span>
            <strong>{favoriteCount}</strong>
          </div>
        </div>
      </div>
    </header>
  );
}
