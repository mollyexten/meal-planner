// API doc for searching by ingredients https://www.themealdb.com/api/json/v1/1/filter.php?i=rice
// API doc for searching by recipe id https://www.themealdb.com/api/json/v1/1/lookup.php?i=52997

// Set up variable for appending elements to bottom part of screen
const bottom = document.querySelector(".bottom")
const favoriteRecipes = []
const searchIngredients = []

// Create a showResults() function to capture search results based on ingredient
async function showResults(ingredient) {

  // Store the URL that accesses the API in a variable
  const ingredientURL = `https://www.themealdb.com/api/json/v1/1/filter.php?i=${ingredient}`
  
  // Make the try/catch part
  try {
    
    // If invoking showResults from within the renderRecipe function, the "recipe-bottom" id will need to be removed from bottom
    bottom.removeAttribute("id");

    // Invoke the removeBottom() function to clear any existing search results and recipe
    removeBottom()
    
    // Access the API
    let response = await axios.get(ingredientURL)
    
    // Store the meal data array in a variable
    let recipes = response.data.meals

    // Catch recipes that have a null value and indicate that it yielded no results
    if (recipes === null) {
      let noRecipes = document.createElement("p")
      noRecipes.textContent = "No recipes found"
      bottom.append(noRecipes)
      return
    }

    // Report the number of results found
    if (recipes.length > 0) {
      recipeCount = document.createElement("p")
      recipes.length > 1 ? recipeCount.textContent = `${recipes.length} recipes found` : recipeCount.textContent = `${recipes.length} recipe found`
      recipeCount.style.width = "100%"
      recipeCount.style.textAlign = "center"
      bottom.append(recipeCount)
    }

    // Loop through each meal data item, storing image and dish name in variables
    recipes.forEach((recipe) => {
      
      // Create a container for each image and dish
      const mealDiv = document.createElement("div")
      mealDiv.className = "meal-div"
      bottom.append(mealDiv)
      
      // Create html elements for each image and dish with attributes
      let image = document.createElement("img")
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
    
    // Obligatory "return response" part
    return response
  } catch (err) {
    console.error(err)
  }
}

// Event listener for the search button
const form = document.querySelector("form")
form.addEventListener("submit", (e) => {
  
  // Prevent search bar from clearing before value can be extracted
  e.preventDefault()
  
  // Store the search value in a variable
  let searchValue = document.querySelector("#search-value").value

  // Plug the search value into the showResults function
  showResults(searchValue)

  // Reset the form after the submit button has been clicked
  document.querySelector("#search-value").value = ""
})

// removeBottom function to take out existing search results or recipe
function removeBottom() {

  // Loop through the child elements of the div, removing each one until there are none left
  while (bottom.lastChild) {
    bottom.removeChild(bottom.lastChild)
  }
}

// Create a renderRecipe() function to display the photo, ingredients, and directions

async function renderRecipe(id, ingredient) {
  
  // Remove search results
  removeBottom()
  
  // Store the URL that accesses the API in a variable
  const recipeURL = `https://www.themealdb.com/api/json/v1/1/lookup.php?i=${id}`
  
  // Make the try/catch part
  try {

    // Access the API
    let response = await axios.get(recipeURL)
    let recipe = response.data.meals[0]

    // Store recipe name in variable "name"
    let name = document.createElement("p")
    name.textContent = recipe.strMeal
    name.className = "recipe-headers"
    name.id = "recipe-name"

    // Store recipe image in variable "image"
    let image = document.createElement("img")
    image.src = recipe.strMealThumb
    image.width = "300"
    image.className = "recipe-image"

    // Create a header for recipe instructions
    let instructionsHeader = document.createElement("p")
    instructionsHeader.textContent = "Instructions"
    instructionsHeader.className = "recipe-headers"
    
    
    // Store recipe instructions in variable "instructions"
    let instructions = document.createElement("p")
    instructions.textContent = recipe.strInstructions
    instructions.className = "instructions"
    
    // Append name to bottom half of page
    bottom.id = "recipe-bottom"
    bottom.append(name)

    // Create a div to store image and ingredients
    const recipeDiv = document.createElement("div")
    recipeDiv.className = "recipe-div"
    bottom.append(recipeDiv)
    recipeDiv.append(image)
    
    // Invoke listIngredients function to access ingredients with their amounts and append to page after the image
    listIngredients(recipe)
    
    // Append instructions to the bottom half of the page
    const instructionsDiv = document.createElement("div")
    instructionsDiv.className = "instructions-div"
    bottom.append(instructionsDiv)
    instructionsDiv.append(instructionsHeader)
    instructionsDiv.append(instructions)
    
    // Create a div for buttons at the top of the recipe
    const recipeButtonDiv = document.createElement("div")
    recipeButtonDiv.className = "recipe-button-div"
    bottom.prepend(recipeButtonDiv)

    // Append the back button to recipeButtonDiv
    const back = document.createElement("button")
    back.textContent = "Back to results"
    back.id = "back-button"
    recipeButtonDiv.append(back)

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

    // Add event listener to back button
    back.addEventListener("click", function() {
      showResults(ingredient)
    })

    // Obligatory return response
    return response
  } catch (err) {
    console.error(err)
  }
}

function listIngredients(obj) {
  
  // Append the ingredients table to the top half of the recipe (after the image)
  
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

// Create a function to save recipes
function saveRecipe(id, searchIngredient) {
  if (favoriteRecipes.includes(id)) {
    recipeBox(favoriteRecipes, searchIngredients)
  } else {
    window.localStorage.setItem(id, id)
    favoriteRecipes.push(window.localStorage.getItem(id))
    searchIngredients.push(searchIngredient)
    recipeBox(favoriteRecipes, searchIngredients)
  }
}

async function recipeBox(recipes, ingredients) {
  removeBottom()
  let recipeURLs = []
  for (let i = 0; i < recipes.length; i++) {
    recipeURLs.push(`https://www.themealdb.com/api/json/v1/1/lookup.php?i=${recipes[i]}`)
  }
  try {
    let recipeIDs = []
    for (let i = 0; i < recipeURLs.length; i++) {
      let response = await axios.get(recipeURLs[i])
      
      let recipe = response.data.meals[0]
      
      let dish = document.createElement("p")
      dish.textContent = recipe.strMeal
      dish.className = "search-dish"
      dish.id = recipe.idMeal
      
      let image = document.createElement("img")
      image.src = recipe.strMealThumb
      image.width = "250"
      image.className = "search-image"
      image.id = recipe.idMeal

      recipeIDs.push(image.id)
      
      const mealDiv = document.createElement("div")
      mealDiv.className = "meal-div"
      bottom.append(mealDiv)

      mealDiv.append(image)
      mealDiv.append(dish)
    }
    // Create a div for buttons at the top of the recipe
    const recipeButtonDiv = document.createElement("div")
    recipeButtonDiv.className = "recipe-button-div"
    bottom.prepend(recipeButtonDiv)
    
    // Append the back button to recipeButtonDiv
    const back = document.createElement("button")
    back.textContent = "Back to recipe"
    back.id = "back-button"
    back.className = recipeIDs[recipeIDs.length-1]
    recipeButtonDiv.append(back)
    
    // Add event listener to back button
    back.addEventListener("click", (e) => {
      renderRecipe(e.target.className, ingredients[ingredients.length-1])
    })
    return recipeURLs
  } catch (err) {
    console.error(err)
  }
}