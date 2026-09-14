function RecipeCard({ recipe, onEdit }) {
  return (
    <article className="recipe-card">
      <div className="recipe-card-image-wrap">
        {recipe.image ? (
          <img
            src={recipe.image}
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

        <button
          type="button"
          className="btn-edit"
          onClick={() => onEdit(recipe)}
        >
          Redigera
        </button>
      </div>
    </article>
  );
}

export default RecipeCard;