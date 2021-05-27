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

function createRecipeHeader(recipe) {
  const name = document.createElement("p")
  name.textContent = recipe.strMeal
  name.className = "recipe-headers"
  name.id = "recipe-name"
  return name
}

function createRecipeImage(recipe) {
  const image = document.createElement("img")
  image.alt = "photo of recipe"
  image.src = recipe.strMealThumb
  image.className = "recipe-image"
  return image
}

function createInstructionsHeader() {
  const instructionsHeader = document.createElement("p")
  instructionsHeader.textContent = "Instructions"
  instructionsHeader.className = "recipe-headers"
  return instructionsHeader
}

function createInstructions(recipe) {
  const instructions = document.createElement("p")
  instructions.textContent = recipe.strInstructions
  instructions.className = "instructions"
  return instructions
}

function createSaveButton(favoriteRecipes, id) {
  const save = document.createElement("button")
  if (favoriteRecipes.includes(id)) {
    save.textContent = "Recipe saved"
    save.className = "already-saved-button"
  } else {
    save.textContent = "Save recipe"
    save.className = "save-button"
  }
  save.id = id
  return save
}

function createIngredientHeader() {
  const ingredientHeader = document.createElement("p")
  ingredientHeader.textContent = "Ingredients"
  ingredientHeader.className = "recipe-headers"
  return ingredientHeader
}

function displayRecipeCategory(category) {
  const recipeCategory = document.createElement("p")
  recipeCategory.textContent = `Here are some other ${category.toLowerCase()} recipes`
  recipeCategory.style.width = "100%"
  recipeCategory.style.textAlign = "center"
  return recipeCategory
}

function createSavedHeader(recipes) {
  const savedRecipesHeader = document.createElement("p")
  recipes.length === 1 ? savedRecipesHeader.textContent = `${recipes.length} recipe saved` : savedRecipesHeader.textContent = `${recipes.length} recipes saved`
  savedRecipesHeader.style.width = "100%"
  savedRecipesHeader.style.textAlign = "center"
  return savedRecipesHeader
}