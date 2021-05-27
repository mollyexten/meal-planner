// ====================== RECIPE HELPER =========================================
function listIngredients(obj) {
  // Create elements for ingredients table and append after image
  const recipeDiv = document.querySelector(".recipe-div")
  const ingredientsDiv = document.createElement("div")
  ingredientsDiv.className = "ingredients-div"
  recipeDiv.append(ingredientsDiv)

  const ingredientHeader = createIngredientHeader()
  ingredientsDiv.append(ingredientHeader)
  ingredientTable = document.createElement("table")
  ingredientsDiv.append(ingredientTable)
  
  let measurements = []
  let ingredients = []
  
  // Push into measurements and ingredients with a for...in loop
  for (let key in obj) {
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

// ================================= EXPLORE HELPER ================================
function shuffle(recipes) {
  let shuffledRecipes = recipes
  let currentIndex = recipes.length
  let temporaryValue
  let randomIndex
  while (currentIndex > 0) {
    randomIndex = Math.round(Math.random() * currentIndex)
    currentIndex--
    temporaryValue = shuffledRecipes[currentIndex]
    shuffledRecipes[currentIndex] = shuffledRecipes[randomIndex]
    shuffledRecipes[randomIndex] = temporaryValue
  }
  return shuffledRecipes;
}