import { useEffect, useState } from "react";

function RecipeForm({
  editingRecipe,
  onRecipeCreated,
  onRecipeUpdated,
}) {
  const [name, setName] = useState("");
  const [category, setCategory] = useState("");
  const [cookingTime, setCookingTime] = useState("");
  const [error, setError] = useState("");

  useEffect(() => {
    if (editingRecipe) {
      setName(editingRecipe.name);
      setCategory(editingRecipe.category);
      setCookingTime(editingRecipe.cookingTime);
    } else {
      setName("");
      setCategory("");
      setCookingTime("");
    }
  }, [editingRecipe]);

  async function handleSubmit(event) {
    event.preventDefault();

    const recipeData = {
      name,
      category,
      cookingTime: Number(cookingTime),
    };

    try {
      if (editingRecipe) {
        const response = await fetch(
          `http://localhost:5008/api/Recipes/${editingRecipe.id}`,
          {
            method: "PUT",
            headers: {
              "Content-Type": "application/json",
            },
            body: JSON.stringify(recipeData),
          }
        );

        if (!response.ok) {
          throw new Error("Det gick inte att uppdatera receptet.");
        }

        const updatedRecipe = await response.json();

        onRecipeUpdated(updatedRecipe);
      } else {
        const response = await fetch(
          "http://localhost:5008/api/Recipes",
          {
            method: "POST",
            headers: {
              "Content-Type": "application/json",
            },
            body: JSON.stringify(recipeData),
          }
        );

        if (!response.ok) {
          throw new Error("Det gick inte att spara receptet.");
        }

        const savedRecipe = await response.json();

        onRecipeCreated(savedRecipe);
      }

      setError("");
    } catch (error) {
      console.error(error);
      setError(
        editingRecipe
          ? "Något gick fel när receptet skulle uppdateras."
          : "Något gick fel när receptet skulle sparas."
      );
    }
  }

  return (
    <form className="recipe-form" onSubmit={handleSubmit}>
      <div className="form-header">
        <h2 className="form-title">
          {editingRecipe ? "Redigera recept" : "Lägg till recept"}
        </h2>

        <p className="form-subtitle">
          {editingRecipe
            ? "Ändra receptets uppgifter"
            : "Fyll i detaljerna för ditt nya favoritrecept"}
        </p>
      </div>

      {error && <p className="error-message">{error}</p>}

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
        {editingRecipe ? "Spara ändringar" : "Spara recept"}
      </button>
    </form>
  );
}

export default RecipeForm;