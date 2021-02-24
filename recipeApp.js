// API doc https://www.themealdb.com/api/json/v1/1/lookup.php?i=52997

// Create a renderRecipe() function to display the photo, ingredients, and directions

async function renderRecipe(id) {
  
  // Store the URL that accesses the API in a variable
  const recipeURL = `https://www.themealdb.com/api/json/v1/1/lookup.php?i=${id}`
  
  // Make the try/catch part
  try {

    // I don't think I need to remove any results, so I won't do a removeResults-type function here

    // Access the API
    let response = await axios.get(recipeURL)
    let recipe = response.data.meals[0]

    // Store recipe name in variable "name"
    let name = document.createElement("h1")
    name.textContent = recipe.strMeal

    // Store recipe image in variable "image"
    let image = document.createElement("img")
    image.src = recipe.strMealThumb
    image.width = "400"

    // Store recipe instructions in variable "instructions"
    let instructions = document.createElement("p")
    instructions.textContent = recipe.strInstructions
    
    // Append name and image to the top half of the page
    const appendTop = document.querySelector(".recipe-top")
    appendTop.append(name)
    appendTop.append(image)
    
    // Invoke showIngredients function to access ingredients with their amounts and append to page after the image
    showIngredients(recipe)
    
    // Append instructions to the bottom half of the page
    const appendBottom = document.querySelector(".recipe-bottom")
    appendBottom.append(instructions)

    // Obligatory return resposne
    return response
  } catch (err) {
    console.error(err)
  }
}

// For now I am calling the function with a specific id because I don't know how to do the redirect
renderRecipe("52997")

function showIngredients(obj) {
  
  // Append the ingredients table to the top half of the recipe (after the image)
  const appendTop = document.querySelector(".recipe-top")
  ingredientTable = document.createElement("table")
  appendTop.append(ingredientTable)

  // Give the table the title "Ingredients"
  const header = ingredientTable.createTHead();
  let row = header.insertRow(0);
  let cell = row.insertCell(0);
  cell.textContent = "Ingredients"
  
  // Set up arrays for measurements and ingredients to push into later
  let measurements = []
  let ingredients = []
  
  // I used this resource to understand for...in loops: https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Statements/for...in
  for (let key in obj) {
    // This reference showed me how to check if a string contains a substring: https://flaviocopes.com/how-to-string-contains-substring-javascript/
    if (key.includes("strMeasure") && obj[key] != " ") {
      measurements.push(obj[key])
    }
  }
  for (let key in obj) {
    if (key.includes("strIngredient") && obj[key] != "") {
      ingredients.push(obj[key])
    }
  }

  // Fill in the table with measurement and ingredient arrays
  for (let i = 0; i < measurements.length; i++) {
    let row = ingredientTable.insertRow(i+1)
    let cell1 = row.insertCell(0)
    let cell2 = row.insertCell(1)
    cell1.textContent = measurements[i]
    cell2.textContent = ingredients[i]
  }
}