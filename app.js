// Global variables
const main = document.querySelector("main")
// Arrays for storing saved recipe information from local storage
const favoriteRecipes = []
const searchIngredients = []

// Event listeners for nav bar icons and header
const home = document.querySelector("#nav-home")
home.addEventListener("click", loadHome)
const saved = document.querySelector("#nav-save")
saved.addEventListener("click", function () {
  viewRecipeBox(favoriteRecipes, searchIngredients)
})
const mainHeader = document.querySelector(".header-h1")
mainHeader.addEventListener("click", loadHome)

// Event listener for the search bar
const form = document.querySelector("form")
form.addEventListener("submit", (e) => {
  e.preventDefault()
  let searchValue = document.querySelector("#search-value").value
  // API call for search results
  showResults(searchValue)
  document.querySelector("#search-value").value = ""
})

// API call for random image
loadHome()

// Keep track of saved recipes
function saveRecipe(id, searchIngredient) {
  // Check for duplicate recipes
  if (favoriteRecipes.includes(id)) {
    viewRecipeBox(favoriteRecipes, searchIngredients)
  } else {
    window.localStorage.setItem(id, id)
    favoriteRecipes.push(window.localStorage.getItem(id))
    searchIngredients.push(searchIngredient)
    viewRecipeBox(favoriteRecipes, searchIngredients)
  }
}