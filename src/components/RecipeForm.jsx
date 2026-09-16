import { API_URL } from "../api";
import { useEffect, useState } from "react";

function RecipeForm({
  editingRecipe,
  onRecipeCreated,
  onRecipeUpdated,
}) {
  const [name, setName] = useState("");
  const [category, setCategory] = useState("");
  const [cookingTime, setCookingTime] = useState("");
  const [ingredients, setIngredients] = useState("");
  const [instructions, setInstructions] = useState("");
  const [imageFile, setImageFile] = useState(null);
  const [error, setError] = useState("");

  useEffect(() => {
    if (editingRecipe) {
      setName(editingRecipe.name);
      setCategory(editingRecipe.category);
      setCookingTime(editingRecipe.cookingTime);
      setIngredients(editingRecipe.ingredients || "");
      setInstructions(editingRecipe.instructions || "");
    } else {
      setName("");
      setCategory("");
      setCookingTime("");
      setIngredients("");
      setInstructions("");
    }

    setImageFile(null);
  }, [editingRecipe]);

  function handleImageChange(event) {
    const file = event.target.files[0] || null;
    setImageFile(file);
  }

  async function uploadImage(recipeId) {
    if (!imageFile) {
      return null;
    }

    const formData = new FormData();

    formData.append("image", imageFile);

    const response = await fetch(
      `${API_URL}/api/Recipes/${recipeId}/image`,
      {
        method: "POST",
        body: formData,
      }
    );

    if (!response.ok) {
      throw new Error("Det gick inte att ladda upp bilden.");
    }

    return await response.json();
  }

  async function handleDeleteImage() {
    if (!editingRecipe) {
      return;
    }

    try {
      const response = await fetch(
        `${API_URL}/api/Recipes/${editingRecipe.id}/image`,
        {
          method: "DELETE",
        }
      );

      if (!response.ok) {
        throw new Error("Det gick inte att ta bort bilden.");
      }

      const updatedRecipe = await response.json();

      setImageFile(null);
      setError("");

      onRecipeUpdated(updatedRecipe);
    } catch (error) {
      console.error(error);
      setError("Något gick fel när bilden skulle tas bort.");
    }
  }

  async function handleSubmit(event) {
    event.preventDefault();

    const recipeData = {
      name,
      category,
      cookingTime: Number(cookingTime),
      ingredients,
      instructions,
    };

    try {
      if (editingRecipe) {
        const response = await fetch(
          `${API_URL}/api/Recipes/${editingRecipe.id}`,
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

        let updatedRecipe = await response.json();

        if (imageFile) {
          const recipeWithImage = await uploadImage(
            updatedRecipe.id
          );

          if (recipeWithImage) {
            updatedRecipe = recipeWithImage;
          }
        }

        setError("");
        onRecipeUpdated(updatedRecipe);
      } else {
        const response = await fetch(
          `${API_URL}/api/Recipes`,
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

        let savedRecipe = await response.json();

        if (imageFile) {
          const recipeWithImage = await uploadImage(
            savedRecipe.id
          );

          if (recipeWithImage) {
            savedRecipe = recipeWithImage;
          }
        }

        setError("");
        onRecipeCreated(savedRecipe);
      }
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

      <div className="form-group">
        <label htmlFor="ingredients" className="form-label">
          Ingredienser
        </label>

        <textarea
          id="ingredients"
          className="form-input"
          placeholder="T.ex. 2 ägg, 3 dl mjöl, 5 dl mjölk"
          value={ingredients}
          onChange={(event) => setIngredients(event.target.value)}
          rows="5"
          required
        />
      </div>

      <div className="form-group">
        <label htmlFor="instructions" className="form-label">
          Instruktioner
        </label>

        <textarea
          id="instructions"
          className="form-input"
          placeholder="Beskriv hur receptet tillagas..."
          value={instructions}
          onChange={(event) => setInstructions(event.target.value)}
          rows="6"
          required
        />
      </div>

      <div className="form-group">
        <label htmlFor="image" className="form-label">
          Bild
        </label>

        <input
          id="image"
          type="file"
          className="form-input"
          accept="image/*"
          onChange={handleImageChange}
        />

        {editingRecipe?.imagePath && (
          <button
            type="button"
            className="btn-delete-image"
            onClick={handleDeleteImage}
          >
            Ta bort bild
          </button>
        )}
      </div>

      <button type="submit" className="btn-submit">
        {editingRecipe ? "Spara ändringar" : "Spara recept"}
      </button>
    </form>
  );
}

export default RecipeForm;