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
  const appendTop = document.querySelector(".recipe-top")
  ingredientTable = document.createElement("table")
  appendTop.append(ingredientTable)
  for (let key in obj) {
    if (key.includes("strMeasure") && obj[key]!= "") {
      // console.log(obj[key])
      console.log(obj[key])
    }
    if (key.includes("strIngredient") && obj[key] != "") {
      console.log(obj[key])
      // let ingredient = obj[key]
      // console.log(ingredient)
      // let ingredient = document.createElement("p")
      // ingredient.textContent = obj[key]
      // ingredientDiv.append(ingredient)
    }
    // console.log(`${amount} ${ingredient}`)
  }
}