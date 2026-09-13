import { useState } from "react";
import "./App.css";
import Header from "./components/Header";
import RecipeCard from "./components/RecipeCard";
import RecipeForm from "./components/RecipeForm";

function App() {
  const [recipe, setRecipe] = useState({
    name: "Pasta Carbonara",
    category: "Pasta",
    cookingTime: 25,
    image:
      "https://images.unsplash.com/photo-1612874742237-6526221588e3?auto=format&fit=crop&w=800&q=80",
  });
  const [showForm, setShowForm] = useState(false);

  return (
    <div className="app">
      <Header onToggleForm={() => setShowForm(!showForm)} />

      <main className="main-content">
        {/* Hero-sektion */}
        <section className="hero-section">
          <div className="hero-content">
            <h1 className="hero-title">Vad vill du laga idag?</h1>
            <p className="hero-description">
              Samla, organisera och hitta dina allra bästa favoritrecept på en och samma plats.
            </p>

            {/* Visuellt sökfält */}
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

        {/* Lägg till recept - visas när man klickar på knappen i headern */}
        {showForm && (
          <section id="add-recipe" className="form-section">
            <RecipeForm setRecipe={setRecipe} />
          </section>
        )}

        {/* Mina recept */}
        <section id="recipes" className="recipes-section">
          <div className="section-header">
            <h2 className="section-title">Mina recept</h2>
            <p className="section-subtitle">Dina sparade måltider och favoriter</p>
          </div>

          <div className="recipe-grid">
            <RecipeCard recipe={recipe} />
          </div>
        </section>
      </main>
    </div>
  );
}

export default App;