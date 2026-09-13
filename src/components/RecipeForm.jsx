import { useState } from "react";

function RecipeForm({ setRecipe }) {
  const [name, setName] = useState("");
  const [category, setCategory] = useState("");
  const [cookingTime, setCookingTime] = useState("");

  function handleSubmit(event) {
    event.preventDefault();

    setRecipe({
      name,
      category,
      cookingTime: Number(cookingTime),
    });

    // Rensa fälten efter sparande
    setName("");
    setCategory("");
    setCookingTime("");
  }

  return (
    <form className="recipe-form" onSubmit={handleSubmit}>
      <div className="form-header">
        <h2 className="form-title">Lägg till recept</h2>
        <p className="form-subtitle">Fyll i detaljerna för ditt nya favoritrecept</p>
      </div>

      <div className="form-group">
        <label htmlFor="name" className="form-label">
          Receptnamn
        </label>
        <input
          id="name"
          type="text"
          className="form-input"
          placeholder="T.ex. Pasta Carbonara"
          value={name}
          onChange={(event) => setName(event.target.value)}
          required
        />
      </div>

      <div className="form-group">
        <label htmlFor="category" className="form-label">
          Kategori
        </label>
        <input
          id="category"
          type="text"
          className="form-input"
          placeholder="T.ex. Pasta, Soppa eller Bakverk"
          value={category}
          onChange={(event) => setCategory(event.target.value)}
          required
        />
      </div>

      <div className="form-group">
        <label htmlFor="cookingTime" className="form-label">
          Tillagningstid (minuter)
        </label>
        <input
          id="cookingTime"
          type="number"
          className="form-input"
          placeholder="T.ex. 30"
          value={cookingTime}
          onChange={(event) => setCookingTime(event.target.value)}
          min="1"
          required
        />
      </div>

      <button type="submit" className="btn-submit">
        Spara recept
      </button>
    </form>
  );
}

export default RecipeForm;