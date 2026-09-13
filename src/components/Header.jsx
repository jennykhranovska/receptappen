function Header({ onToggleForm }) {
  return (
    <header className="header">
      <div className="header-container">
        <a href="#" className="logo">
          <span className="logo-icon">🍲</span>
          <span className="logo-text">Smaka</span>
        </a>
        <nav className="nav">
          <a href="#recipes" className="nav-link">
            Mina recept
          </a>
          <button type="button" className="btn-add" onClick={onToggleForm}>
            + Lägg till recept
          </button>
        </nav>
      </div>
    </header>
  );
}

export default Header;