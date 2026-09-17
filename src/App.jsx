import { API_URL } from "./api";
import { useEffect, useState } from "react";
import { Route, Routes, useNavigate, useParams } from "react-router-dom";
import "./App.css";
import Header from "./components/Header";
import RecipeCard from "./components/RecipeCard";
import RecipeForm from "./components/RecipeForm";

function RecipeDetailsPage({ recipes, onEdit, onDelete }) {
  const { id } = useParams();

  const recipe = recipes.find(
    (recipe) => recipe.id === Number(id)
  );

  if (!recipe) {
    return <p>Receptet laddas...</p>;
  }

  return (
    <section className="form-section">
      <div className="recipe-form">
        {recipe.category && (
          <span className="recipe-badge">
            {recipe.category}
          </span>
        )}

        <h1 className="form-title">{recipe.name}</h1>

        <p className="recipe-time">
          ⏱️ {recipe.cookingTime} minuter
        </p>

        <div className="form-group">
          <h3>Ingredienser</h3>

          <p style={{ whiteSpace: "pre-line" }}>
            {recipe.ingredients || "Inga ingredienser tillagda."}
          </p>
        </div>

        <div className="form-group">
          <h3>Instruktioner</h3>

          <p style={{ whiteSpace: "pre-line" }}>
            {recipe.instructions || "Inga instruktioner tillagda."}
          </p>
        </div>

        <div className="recipe-actions">
          <button
            type="button"
            className="btn-edit-details"
            onClick={() => onEdit(recipe)}
          >
            Redigera recept
          </button>

          <button
            type="button"
            className="btn-delete"
            onClick={() => onDelete(recipe)}
          >
            Ta bort recept
          </button>
        </div>
      </div>
    </section>
  );
}

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
  const [searchTerm, setSearchTerm] = useState("");
  const navigate = useNavigate();

  useEffect(() => {
    fetch(`${API_URL}/api/Recipes`)
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
  const filteredRecipes = recipes.filter((recipe) => {
  const search = searchTerm.toLowerCase().trim();

  if (!search) {
    return true;
  }

  const words = `${recipe.name} ${recipe.ingredients} ${recipe.category}`
    .toLowerCase()
    .split(/[\s,.;:!?()]+/);

  return words.some((word) => word.startsWith(search));
});
  function handleRecipeCreated(savedRecipe) {
    setRecipes((currentRecipes) => [
      ...currentRecipes,
      savedRecipe,
    ]);

    navigate(`/recipes/${savedRecipe.id}`);
  }

  function handleOpenRecipe(recipe) {
    navigate(`/recipes/${recipe.id}`);
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

    navigate(`/recipes/${updatedRecipe.id}`);
  }

  async function handleDeleteRecipe(recipe) {
    const confirmed = window.confirm(
      `Vill du verkligen ta bort "${recipe.name}"?`
    );

    if (!confirmed) {
      return;
    }

    try {
      const response = await fetch(
        `${API_URL}/api/Recipes/${recipe.id}`,
        {
          method: "DELETE",
        }
      );

      if (!response.ok) {
        throw new Error("Det gick inte att ta bort receptet.");
      }

      setRecipes((currentRecipes) =>
        currentRecipes.filter(
          (currentRecipe) => currentRecipe.id !== recipe.id
        )
      );

      setError("");
      navigate("/");
    } catch (error) {
      console.error(error);
      setError("Något gick fel när receptet skulle tas bort.");
    }
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
  value={searchTerm}
  onChange={(e) => setSearchTerm(e.target.value)}
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
                  {filteredRecipes.map((recipe) => (  
                      <RecipeCard
                        key={recipe.id}
                        recipe={recipe}
                        onOpen={handleOpenRecipe}
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
            path="/recipes/:id"
            element={
              <RecipeDetailsPage
                recipes={recipes}
                onEdit={handleEditRecipe}
                onDelete={handleDeleteRecipe}
              />
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