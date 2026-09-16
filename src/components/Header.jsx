function Header({ onShowRecipes, onShowForm }) {
  return (
    <header className="header">
      <div className="header-container">
       <a
  href="/"
  className="logo"
  onClick={(e) => {
    e.preventDefault();
    onShowRecipes();
  }}
>
  <span className="logo-icon">🍲</span>
  <span className="logo-text">Smaka</span>
</a>

        <nav className="nav">
          <button
            type="button"
            className="nav-link"
            onClick={onShowRecipes}
          >
            Mina recept
          </button>

          <button
            type="button"
            className="btn-add"
            onClick={onShowForm}
          >
            + Lägg till recept
          </button>
        </nav>
      </div>
    </header>
  );
}

export default Header;