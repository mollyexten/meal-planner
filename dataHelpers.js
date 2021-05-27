function listIngredients(obj) {
  // Create elements for ingredients table and append after image
  recipeDiv = document.querySelector(".recipe-div")
  ingredientsDiv = document.createElement("div")
  ingredientsDiv.className = "ingredients-div"
  recipeDiv.append(ingredientsDiv)

  const ingredientHeader = createIngredientHeader()
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