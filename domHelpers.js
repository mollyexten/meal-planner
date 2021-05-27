function createMainImage(recipe) {
  let mainImage = document.createElement("img")
  mainImage.src = recipe.strMealThumb
  mainImage.alt = "random photo of food"
  mainImage.id = recipe.idMeal
  mainImage.className = "background-image"
  return mainImage
}

function showNoRecipes(ingredient) {
  let noRecipes = document.createElement("p")
  noRecipes.textContent = `No recipes found for "${ingredient}"`
  return noRecipes
}

// recipeCount = document.createElement("p")
// recipes.length > 1 ? recipeCount.textContent = `${recipes.length} recipes found for "${ingredient}"` : recipeCount.textContent = `${recipes.length} recipe found for "${ingredient}"`
// recipeCount.style.width = "100%"
// recipeCount.style.textAlign = "center"
function countRecipes(recipes, ingredient) {
  const recipeCount = document.createElement("p")
  recipes.length > 1 ? recipeCount.textContent = `${recipes.length} recipes found for "${ingredient}"` : recipeCount.textContent = `${recipes.length} recipe found for "${ingredient}"`
  recipeCount.style.width = "100%"
  recipeCount.style.textAlign = "center"
  return recipeCount;
}