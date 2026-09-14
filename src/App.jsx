import { useEffect, useState } from "react";
import "./App.css";
import Header from "./components/Header";
import RecipeCard from "./components/RecipeCard";
import RecipeForm from "./components/RecipeForm";

function App() {
  const [recipes, setRecipes] = useState([]);
  const [showForm, setShowForm] = useState(false);
  const [editingRecipe, setEditingRecipe] = useState(null);
  const [error, setError] = useState("");

  useEffect(() => {
    fetch("http://localhost:5008/api/Recipes")
      .then((response) => {
        if (!response.ok) {
          throw new Error("Det gick inte att hämta recepten.");
        }

        return response.json();
      })
      .then((data) => {
        setRecipes(data);
        setError("");
      })
      .catch((error) => {
        console.error(error);
        setError("Något gick fel när recepten skulle hämtas.");
      });
  }, []);

  function handleRecipeCreated(savedRecipe) {
    setRecipes((currentRecipes) => [...currentRecipes, savedRecipe]);
    setShowForm(false);
  }

  function handleEditRecipe(recipe) {
    setEditingRecipe(recipe);
    setShowForm(true);
  }

  function handleRecipeUpdated(updatedRecipe) {
    setRecipes((currentRecipes) =>
      currentRecipes.map((recipe) =>
        recipe.id === updatedRecipe.id ? updatedRecipe : recipe
      )
    );

    setEditingRecipe(null);
    setShowForm(false);
  }

  function handleShowNewRecipeForm() {
    setEditingRecipe(null);
    setShowForm(true);
  }

  return (
    <div className="app">
      <Header
        onShowRecipes={() => {
          setShowForm(false);
          setEditingRecipe(null);
        }}
        onShowForm={handleShowNewRecipeForm}
      />

      <main className="main-content">
        {!showForm ? (
          <>
            <section className="hero-section">
              <div className="hero-content">
                <h1 className="hero-title">Vad vill du laga idag?</h1>

                <p className="hero-description">
                  Samla, organisera och hitta dina allra bästa favoritrecept på
                  en och samma plats.
                </p>

                <div className="search-bar">
                  <span className="search-icon">🔍</span>

                  <input
                    type="text"
                    className="search-input"
                    placeholder="Sök recept, råvara eller kategori..."
                    aria-label="Sök recept"
                  />
                </div>
              </div>
            </section>

            <section id="recipes" className="recipes-section">
              <div className="section-header">
                <h2 className="section-title">Mina recept</h2>

                <p className="section-subtitle">
                  Dina sparade måltider och favoriter
                </p>
              </div>

              {error && <p className="error-message">{error}</p>}

              <div className="recipe-grid">
                {recipes.map((recipe) => (
                  <RecipeCard
                    key={recipe.id}
                    recipe={recipe}
                    onEdit={handleEditRecipe}
                  />
                ))}
              </div>
            </section>
          </>
        ) : (
          <section id="add-recipe" className="form-section">
            <RecipeForm
              editingRecipe={editingRecipe}
              onRecipeCreated={handleRecipeCreated}
              onRecipeUpdated={handleRecipeUpdated}
            />
          </section>
        )}
      </main>
    </div>
  );
}

export default App;