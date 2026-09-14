function RecipeCard({ recipe, onOpen }) {
  function handleKeyDown(event) {
    if (event.key === "Enter" || event.key === " ") {
      onOpen(recipe);
    }
  }

  return (
    <article
      className="recipe-card"
      onClick={() => onOpen(recipe)}
      onKeyDown={handleKeyDown}
      role="button"
      tabIndex="0"
    >
     <div className="recipe-card-image-wrap">
  {recipe.imagePath ? (
    <img
      src={`http://localhost:5008${recipe.imagePath}`}
      alt={recipe.name}
      className="recipe-card-image"
    />
  ) : (
    <div className="recipe-card-placeholder">
      <span className="placeholder-icon">🍳</span>
    </div>
  )}
</div>

      <div className="recipe-card-body">
        {recipe.category && (
          <span className="recipe-badge">{recipe.category}</span>
        )}

        <h3 className="recipe-title">{recipe.name}</h3>

        <p className="recipe-time">
          ⏱️ {recipe.cookingTime} minuter
        </p>
      </div>
    </article>
  );
}

export default RecipeCard;