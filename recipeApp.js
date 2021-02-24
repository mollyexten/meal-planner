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
    console.log(response)
    let recipe = response.data.meals[0]
    let name = document.createElement("h1")
    name.textContent = recipe.strMeal
    console.log(name)

    let image = document.createElement("img")
    image.src = recipe.strMealThumb
    image.width = "400"
    console.log(image)

    let instructions = document.createElement("p")
    instructions.textContent = recipe.strInstructions
    console.log(instructions)

    console.log("ingredients", recipe)
    
    
    const appendTop = document.querySelector(".recipe-top")
    appendTop.append(name)
    appendTop.append(image)
    
    const appendBottom = document.querySelector(".recipe-bottom")
    appendBottom.append(instructions)
    
    showIngredients(recipe)

    return response
  } catch (err) {
    console.error(err)
  }
}

renderRecipe("52997")

// function showIngredients(obj, objName) {
//   for (let key in obj) {
//     if (key.includes("strIngredient")) {
//       console.log(`${objName}.${key} = ${obj[key]}`)
//     }
//   }
// }

function showIngredients(obj) {
  const appendTop = document.querySelector(".recipe-top")
  ingredientTable = document.createElement("table")
  appendTop.append(ingredientTable)
  const header = ingredientTable.createTHead();
  let row = header.insertRow(0);
  let cell = row.insertCell(0);
  cell.textContent = "Ingredients"
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
  for (let i = 0; i < measurements.length; i++) {
    let row = ingredientTable.insertRow(i+1)
    let cell1 = row.insertCell(0)
    let cell2 = row.insertCell(1)
    cell1.textContent = measurements[i]
    cell2.textContent = ingredients[i]
  }
}