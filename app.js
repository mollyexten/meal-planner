// Global variables
const main = document.querySelector("main")
// Arrays for storing saved recipe information from local storage
const favoriteRecipes = []
const searchIngredients = []

// Display random image with link to recipe on home page
loadHome()

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
  showResults(searchValue)
  document.querySelector("#search-value").value = ""
})

// Load a random recipe image in the "home page"
async function loadHome() {
  removeMain()
  main.removeAttribute("id")
  const randomURL = "https://www.themealdb.com/api/json/v1/1/random.php"
  try {
    let response = await axios.get(randomURL)
    let randomRecipe = response.data.meals[0]
    let randomImage = randomRecipe.strMealThumb
    let mainImage = document.createElement("img")
    mainImage.src = randomImage
    mainImage.alt = "random photo of food"
    mainImage.id = randomRecipe.idMeal
    mainImage.className = "background-image"
    mainImage.addEventListener("click", (e) => {
      renderRecipe(e.target.id, randomRecipe.strIngredient1)
      window.localStorage.setItem("randomRecipe", e.target.id)
    })
    main.append(mainImage)
    appendFooter()
    return response
  } catch (err) {
    console.error(err)
  }
}

// Remove all appended child elements in the main part
function removeMain() {
  while (main.lastChild) {
    main.removeChild(main.lastChild)
  }
}

// Add a footer citing the API
function appendFooter() {
  let footer = `<footer>Recipes sourced from <a href="https://www.themealdb.com">TheMealDB</a> (API)</footer>`
  return main.insertAdjacentHTML("beforeend", footer)
}

// Display search results based on ingredient
async function showResults(ingredient) {

  // Store the URL that accesses the API in a variable
  const ingredientURL = `https://www.themealdb.com/api/json/v1/1/filter.php?i=${ingredient}`
  
  // Make the try/catch part
  try {
    
    // If invoking showResults from within the renderRecipe function, the "recipe-view" id will need to be removed from main
    main.removeAttribute("id");

    // Invoke the removeMain() function to clear any existing search results and recipe
    removeMain()
    
    // Access the API
    let response = await axios.get(ingredientURL)
    
    // Store the meal data array in a variable
    let recipes = response.data.meals

    // Catch recipes that have a null value and indicate that it yielded no results
    if (recipes === null) {
      let noRecipes = document.createElement("p")
      noRecipes.textContent = "No recipes found"
      main.append(noRecipes)
      return
    }

    // Report the number of results found
    if (recipes.length > 0) {
      recipeCount = document.createElement("p")
      recipes.length > 1 ? recipeCount.textContent = `${recipes.length} recipes found` : recipeCount.textContent = `${recipes.length} recipe found`
      recipeCount.style.width = "100%"
      recipeCount.style.textAlign = "center"
      main.append(recipeCount)
    }

    // Loop through each meal data item, storing image and dish name in variables
    recipes.forEach((recipe) => {
      
      // Create a container for each image and dish
      const mealDiv = document.createElement("div")
      mealDiv.className = "meal-div"
      main.append(mealDiv)
      
      // Create html elements for each image and dish with attributes
      let image = document.createElement("img")
      image.alt = "recipe photo"
      image.src = recipe.strMealThumb
      image.width = "250"
      image.className = "search-image"
      image.id = recipe.idMeal
      let dish = document.createElement("p")
      dish.textContent = recipe.strMeal
      dish.className = "search-dish"
      dish.id = recipe.idMeal
      mealDiv.addEventListener("click", (e) => {
        renderRecipe(e.target.id, ingredient)
      })
      
      // Create a container for image and dish, append to DOM
      mealDiv.append(image)
      mealDiv.append(dish)
    })
    appendFooter()
    return response
  } catch (err) {
    console.error(err)
  }
}

// Display the photo, ingredients, and instructions for a specific recipe
async function renderRecipe(id, ingredient) {
  removeMain()
  
  // Store the URL that accesses the API in a variable
  const recipeURL = `https://www.themealdb.com/api/json/v1/1/lookup.php?i=${id}`
  
  try {

    // Access the API
    let response = await axios.get(recipeURL)
    let recipe = response.data.meals[0]

    // Assign id to main to allow recipe formatting
    main.id = "recipe-view"

    // Create recipe name element and append to main
    let name = document.createElement("p")
    name.textContent = recipe.strMeal
    name.className = "recipe-headers"
    name.id = "recipe-name"
    main.append(name)

    // Create a div to store image and ingredients
    const recipeDiv = document.createElement("div")
    recipeDiv.className = "recipe-div"
    let image = document.createElement("img")
    image.alt = "photo of recipe"
    image.src = recipe.strMealThumb
    image.className = "recipe-image"
    main.append(recipeDiv)
    recipeDiv.append(image)

    // Append ingredients within this function
    listIngredients(recipe)

    // Create a div for the instructions
    const instructionsDiv = document.createElement("div")
    instructionsDiv.className = "instructions-div"
    main.append(instructionsDiv)

    // Create instructions header and paragraph and append
    let instructionsHeader = document.createElement("p")
    instructionsHeader.textContent = "Instructions"
    instructionsHeader.className = "recipe-headers"
    let instructions = document.createElement("p")
    instructions.textContent = recipe.strInstructions
    instructions.className = "instructions"
    instructionsDiv.append(instructionsHeader)
    instructionsDiv.append(instructions)
    
    // Create a recipe button div and prepend to the main part
    const recipeButtonDiv = document.createElement("div")
    recipeButtonDiv.className = "recipe-button-div"
    main.prepend(recipeButtonDiv)

    // Append back/explore button
    const backExplore = document.createElement("button")
    backExplore.id = "back-explore-button"
    let randomFlag = window.localStorage.getItem("randomRecipe")
    if (favoriteRecipes.includes(id) || randomFlag === id) {  
      backExplore.textContent = "Explore more"
    } else {
      backExplore.textContent = "Back to results"
    }
    recipeButtonDiv.append(backExplore)
    backExplore.addEventListener("click", function () {
      showResults(ingredient)
    })

    // Append the save button to the recipeButtonDiv
    const save = document.createElement("button")
    if (favoriteRecipes.includes(id)) {
      save.textContent = "Recipe saved"
      save.className = "already-saved-button"
    } else {
      save.textContent = "Save recipe"
      save.className = "save-button"
    }
    save.id = id
    recipeButtonDiv.append(save)
    save.addEventListener("click", (e) => {
      e.target.id = id
      saveRecipe(e.target.id, ingredient)
    })

    return response
  } catch (err) {
    console.error(err)
  }
}

function listIngredients(obj) {
  
  // Create elements for ingredients table and append after image
  recipeDiv = document.querySelector(".recipe-div")
  ingredientsDiv = document.createElement("div")
  ingredientsDiv.className = "ingredients-div"
  recipeDiv.append(ingredientsDiv)
  
  ingredientHeader = document.createElement("p")
  ingredientHeader.textContent = "Ingredients"
  ingredientHeader.className = "recipe-headers"
  ingredientsDiv.append(ingredientHeader)
  
  ingredientTable = document.createElement("table")
  ingredientsDiv.append(ingredientTable)
  
  // Set up arrays for measurements and ingredients to push into later
  let measurements = []
  let ingredients = []
  
  // I used this resource to understand for...in loops: https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Statements/for...in
  for (let key in obj) {
    // This reference showed me how to check if a string contains a substring: https://flaviocopes.com/how-to-string-contains-substring-javascript/
    if (key.includes("strMeasure") && (obj[key] != " " || obj[key] != "")) {
      measurements.push(obj[key])
    }
  }
  for (let key in obj) {
    if (key.includes("strIngredient") && (obj[key] != "" || obj[key] != " ")) {
      ingredients.push(obj[key])
    }
  }

  // Fill in the table with measurement and ingredient arrays
  for (let i = 0; i < measurements.length; i++) {
    let row = ingredientTable.insertRow(i)
    let cell1 = row.insertCell(0)
    let cell2 = row.insertCell(1)
    cell1.textContent = measurements[i]
    cell2.textContent = ingredients[i]
  }
}

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

async function viewRecipeBox(recipes, ingredients) {
  removeMain()
  main.removeAttribute("id");

  // Create an array for recipe URLs
  let recipeURLs = []
  for (let i = 0; i < recipes.length; i++) {
    recipeURLs.push(`https://www.themealdb.com/api/json/v1/1/lookup.php?i=${recipes[i]}`)
  }
  try {
    let recipeIDs = []
    for (let i = 0; i < recipeURLs.length; i++) {
      let response = await axios.get(recipeURLs[i])
      let recipe = response.data.meals[0]
      
      // Create a div for each recipe and store image and name
      const mealDiv = document.createElement("div")
      mealDiv.className = "meal-div"
      main.append(mealDiv)

      let image = document.createElement("img")
      image.alt = "photo of saved recipe"
      image.src = recipe.strMealThumb
      image.width = "250"
      image.className = "search-image"
      image.id = recipe.idMeal
      mealDiv.append(image)

      let dish = document.createElement("p")
      dish.textContent = recipe.strMeal
      dish.className = "search-dish"
      dish.id = recipe.idMeal
      mealDiv.append(dish)
      mealDiv.addEventListener("click", (e) => {
        renderRecipe(e.target.id, ingredients[i])
      })
      
      recipeIDs.push(image.id)
    }
    
    // Indicate how many recipes are saved at the top of main
    const savedRecipesHeader = document.createElement("p")
    recipes.length === 1 ? savedRecipesHeader.textContent = `${recipes.length} recipe saved` : savedRecipesHeader.textContent = `${recipes.length} recipes saved`
    savedRecipesHeader.style.width = "100%"
    savedRecipesHeader.style.textAlign = "center"
    main.prepend(savedRecipesHeader)
    
    return recipeURLs
  } catch (err) {
    console.error(err)
  }
}