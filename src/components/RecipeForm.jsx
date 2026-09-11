function RecipeForm() {
  return (
    <form>
      <h2>Lägg till recept</h2>

      <label htmlFor="name">Receptnamn</label>
      <input
        id="name"
        type="text"
        placeholder="T.ex. Pasta Carbonara"
      />

      <label htmlFor="category">Kategori</label>
      <input
        id="category"
        type="text"
        placeholder="T.ex. Pasta"
      />

      <label htmlFor="cookingTime">Tillagningstid</label>
      <input
        id="cookingTime"
        type="number"
        placeholder="Minuter"
      />

      <button type="submit">Lägg till recept</button>
    </form>
  );
}

export default RecipeForm;