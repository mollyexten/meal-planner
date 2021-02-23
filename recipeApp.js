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
    console.log("ingredients", ingredients)
    showIngredients(ingredients)
    // ingredients.filter(ingredient => {
    //   return ingredient.
    //   console.log(ingredient.includes("strIngredient"))
    // })
    // let ingredientsArray = Object.keys(ingredients)
    // console.log("ingredient keys", ingredientsArray)
    // ingredientsArray.forEach((ingredient) => {
    //   if (ingredient.includes("strIngredient")) {
    //     console.log("ingredient keys with strIngredient", ingredient)
    //   }
    // })
    // console.log(Object.keys(ingredients))
    // ingredients.forEach((ingredient) => {
    //   console.log(Object.keys(ingredient))
    //   if (Object.keys(ingredient).includes("strIngredient")) {
    //     console.log(Object.keys(ingredient))
    //   }
    // })
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
  for (let key in obj) {
    if (key.includes("strIngredient") && obj[key] != "") {
      console.log(obj[key])
    }
  }
}