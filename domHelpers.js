function createMainImage(recipe) {
  const mainImage = document.createElement("img")
  mainImage.src = recipe.strMealThumb
  mainImage.alt = "random photo of food"
  mainImage.id = recipe.idMeal
  mainImage.className = "background-image"
  return mainImage
}

function showNoRecipes(ingredient) {
  const noRecipes = document.createElement("p")
  noRecipes.textContent = `No recipes found for "${ingredient}"`
  return noRecipes
}

function countRecipes(recipes, ingredient) {
  const recipeCount = document.createElement("p")
  recipes.length > 1 ? recipeCount.textContent = `${recipes.length} recipes found for "${ingredient}"` : recipeCount.textContent = `${recipes.length} recipe found for "${ingredient}"`
  recipeCount.style.width = "100%"
  recipeCount.style.textAlign = "center"
  return recipeCount;
}

function createListImage(recipe) {
  const image = document.createElement("img")
  image.alt = "recipe photo"
  image.src = recipe.strMealThumb
  image.width = "250"
  image.className = "list-image"
  image.id = recipe.idMeal
  return image
}

function createListDish(recipe) {
  const dish = document.createElement("p")
  dish.textContent = recipe.strMeal
  dish.className = "list-name"
  dish.id = recipe.idMeal
  return dish
}