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
    let name = response.data.meals[0].strMeal
    console.log(name)
    let instructions = response.data.meals[0].strInstructions
    console.log(instructions)
    let ingredients = response.data.meals[0]
    console.log(Object.keys(ingredients))
    console.log(ingredients.hasOwnProperty("strIngredient"))
    return response
  } catch (err) {
    console.error(err)
  }
}

renderRecipe("52997")