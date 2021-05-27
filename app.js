// ========================GLOBAL VARIABLES======================================= //
const main = document.querySelector("main")
const favoriteRecipes = []
const searchIngredients = []

// =============================== NAVBAR ======================================== //
const home = document.querySelector("#nav-home")
home.addEventListener("click", loadHome)
const saved = document.querySelector("#nav-save")
saved.addEventListener("click", function () {
  viewRecipeBox(favoriteRecipes, searchIngredients)
})

// =============================== HEADER ======================================== //
const mainHeader = document.querySelector(".header-h1")
mainHeader.addEventListener("click", loadHome)

// Event listener for the search bar
const form = document.querySelector("form")
form.addEventListener("submit", (e) => {
  e.preventDefault()
  const searchValue = document.querySelector("#search-value").value
  // API call for search results
  showResults(searchValue)
  document.querySelector("#search-value").value = ""
})


// =============================== HOME SCREEN ==================================== //
loadHome()

async function loadHome() {
  removeMain()
  main.removeAttribute("id")
  const randomURL = "https://www.themealdb.com/api/json/v1/1/random.php"
  try {
    const response = await axios.get(randomURL)
    const randomRecipe = response.data.meals[0]
    const mainImage = createMainImage(randomRecipe)
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

// =============================== SEARCH SCREEN ================================ //
async function showResults(ingredient) {
  // Store the URL that accesses the API in a variable
  const ingredientURL = `https://www.themealdb.com/api/json/v1/1/filter.php?i=${ingredient}`
  try {
    main.removeAttribute("id");
    removeMain()
    const response = await axios.get(ingredientURL)
    const recipes = response.data.meals
    if (recipes === null) {
      const noRecipes = showNoRecipes(ingredient)
      main.append(noRecipes)
      return
    }
    // Report the number of results found
    if (recipes.length > 0) {
      const recipeCount = countRecipes(recipes, ingredient)
      main.append(recipeCount)
    }
    recipes.forEach(recipe => {
      // Create a container for each image and dish
      const listRecipeDiv = document.createElement("div")
      listRecipeDiv.className = "list-recipe-div"
      main.append(listRecipeDiv)
      
      // Create html elements for each image and dish with attributes
      const image = createListImage(recipe)
      const dish = createListDish(recipe)
      listRecipeDiv.addEventListener("click", (e) => {
        renderRecipe(e.target.id, ingredient)
      })
      
      // Create a container for image and dish, append to DOM
      listRecipeDiv.append(image)
      listRecipeDiv.append(dish)
    })
    appendFooter()
    return response
  } catch (err) {
    console.error(err)
  }
}

// =============================== RECIPE SCREEN ================================ //
// Display the photo, ingredients, and instructions for a specific recipe
async function renderRecipe(id, ingredient) {
  removeMain()
  const recipeURL = `https://www.themealdb.com/api/json/v1/1/lookup.php?i=${id}`
  try {
    const response = await axios.get(recipeURL)
    const recipe = response.data.meals[0]
    // Assign id to main to allow recipe formatting
    main.id = "recipe-view"

    const name = createRecipeHeader(recipe)
    main.append(name)
    const recipeDiv = document.createElement("div")
    recipeDiv.className = "recipe-div"
    const image = createRecipeImage(recipe)
    main.append(recipeDiv)
    recipeDiv.append(image)

    // Append ingredients within this function
    listIngredients(recipe)

    // List instructions
    const instructionsDiv = document.createElement("div")
    instructionsDiv.className = "instructions-div"
    main.append(instructionsDiv)
    const instructionsHeader = createInstructionsHeader()
    const instructions = createInstructions(recipe)
    instructionsDiv.append(instructionsHeader)
    instructionsDiv.append(instructions)
    
    // Create a recipe button div and prepend to the main part
    const recipeButtonDiv = document.createElement("div")
    recipeButtonDiv.className = "recipe-button-div"
    main.prepend(recipeButtonDiv)

    // Append back/explore button
    const backExplore = createBackExplore()
    let randomFlag = window.localStorage.getItem("randomRecipe")
    let exploreFlag = window.localStorage.getItem("exploreRecipe")
    if (favoriteRecipes.includes(id) || randomFlag === id || exploreFlag === id) {  
      backExplore.textContent = "Explore more"
      backExplore.addEventListener("click", function () {
        exploreMore(recipe.strCategory)
      })
    } else {
      backExplore.textContent = "Back to results"
      backExplore.addEventListener("click", function () {
        showResults(ingredient)
      })
    }
    recipeButtonDiv.append(backExplore)

    const save = createSaveButton(favoriteRecipes, id)
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

// =============================== EXPLORE SCREEN ================================ //
async function exploreMore(category) {
  removeMain()
  main.removeAttribute("id")
  const recipeCategory = displayRecipeCategory(category)
  main.append(recipeCategory)

  const exploreURL = `https://www.themealdb.com/api/json/v1/1/filter.php?c=${category}`

  try {
    let response = await axios.get(exploreURL)
    let recipeList = response.data.meals
    shuffle(recipeList)
    let recipes = recipeList.slice(0, 12)
    recipes.forEach((recipe) => {
      const listRecipeDiv = document.createElement("div")
      listRecipeDiv.className = "list-recipe-div"
      main.append(listRecipeDiv)
    
    // Create html elements for each image and dish with attributes
      const image = createListImage(recipe)
      const dish = createListDish(recipe)
      ingredient = recipe.strIngredient1
      listRecipeDiv.addEventListener("click", (e) => {
        renderRecipe(e.target.id, ingredient)
        window.localStorage.setItem("exploreRecipe", e.target.id)
      })
    
    // Create a container for image and dish, append to DOM
    listRecipeDiv.append(image)
    listRecipeDiv.append(dish)
  })
  appendFooter()
    return response
  } catch (err) {
    console.error(err)
  }
}

// =============================== SAVED SCREEN ================================ //
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
      const listRecipeDiv = document.createElement("div")
      listRecipeDiv.className = "list-recipe-div"
      main.append(listRecipeDiv)

      const image = createListImage(recipe)
      listRecipeDiv.append(image)

      const dish = createListDish(recipe)
      listRecipeDiv.append(dish)
      listRecipeDiv.addEventListener("click", (e) => {
        renderRecipe(e.target.id, ingredients[i])
      })
      
      recipeIDs.push(image.id)
    }
    
    // Indicate how many recipes are saved at the top of main
    const savedRecipesHeader = createSavedHeader(recipes)
    main.prepend(savedRecipesHeader)
    
    return recipeURLs
  } catch (err) {
    console.error(err)
  }
}
