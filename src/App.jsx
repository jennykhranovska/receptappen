import { useEffect, useState } from "react";
import { Route, Routes, useNavigate, useParams } from "react-router-dom";
import "./App.css";
import Header from "./components/Header";
import RecipeCard from "./components/RecipeCard";
import RecipeForm from "./components/RecipeForm";

function EditRecipePage({ recipes, onRecipeUpdated }) {
  const { id } = useParams();

  const recipe = recipes.find(
    (recipe) => recipe.id === Number(id)
  );

  if (!recipe) {
    return <p>Receptet laddas...</p>;
  }

  return (
    <section className="form-section">
      <RecipeForm
        editingRecipe={recipe}
        onRecipeUpdated={onRecipeUpdated}
      />
    </section>
  );
}

function App() {
  const [recipes, setRecipes] = useState([]);
  const [error, setError] = useState("");

  const navigate = useNavigate();

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
    setRecipes((currentRecipes) => [
      ...currentRecipes,
      savedRecipe,
    ]);

    navigate("/");
  }

  function handleEditRecipe(recipe) {
    navigate(`/recipes/${recipe.id}/edit`);
  }

  function handleRecipeUpdated(updatedRecipe) {
    setRecipes((currentRecipes) =>
      currentRecipes.map((recipe) =>
        recipe.id === updatedRecipe.id ? updatedRecipe : recipe
      )
    );

    navigate("/");
  }

  return (
    <div className="app">
      <Header
        onShowRecipes={() => navigate("/")}
        onShowForm={() => navigate("/add-recipe")}
      />

      <main className="main-content">
        <Routes>
          <Route
            path="/"
            element={
              <>
                <section className="hero-section">
                  <div className="hero-content">
                    <h1 className="hero-title">
                      Vad vill du laga idag?
                    </h1>

                    <p className="hero-description">
                      Samla, organisera och hitta dina allra bästa
                      favoritrecept på en och samma plats.
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

                <section
                  id="recipes"
                  className="recipes-section"
                >
                  <div className="section-header">
                    <h2 className="section-title">
                      Mina recept
                    </h2>

                    <p className="section-subtitle">
                      Dina sparade måltider och favoriter
                    </p>
                  </div>

                  {error && (
                    <p className="error-message">{error}</p>
                  )}

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
            }
          />

          <Route
            path="/add-recipe"
            element={
              <section className="form-section">
                <RecipeForm
                  editingRecipe={null}
                  onRecipeCreated={handleRecipeCreated}
                />
              </section>
            }
          />

          <Route
            path="/recipes/:id/edit"
            element={
              <EditRecipePage
                recipes={recipes}
                onRecipeUpdated={handleRecipeUpdated}
              />
            }
          />
        </Routes>
      </main>
    </div>
  );
}

export default App;
