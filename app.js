// API doc https://www.themealdb.com/api/json/v1/1/filter.php?i=rice

// Create a fetchData() function to capture search results based on ingredient

async function fetchData(ingredient) {

  

  // For now the ingredient will be hardcoded in when I invoke this funciton, but eventually it will be captured via an event listener
  const url = `https://www.themealdb.com/api/json/v1/1/filter.php?i=${ingredient}`
  
  // Make the try/catch function
  try {
    
    // Invoke the removeResults() function to clear any existing search results
    removeResults()
    
    // Access the API
    let response = await axios.get(url)
    
    // Store the meal data array in a variable
    let recipes = response.data.meals
    
    // Loop through each meal data item, storing image and dish name in variables
    recipes.forEach((recipe) => {
      let image = document.createElement("img")
      image.src = recipe.strMealThumb
      image.width = "200"
      let dish = document.createElement("p")
      dish.textContent = recipe.strMeal

      // Later I will need the recipe id when I create links to the full recipes
      console.log(`recipe id for link (later) ${recipe.idMeal}`)
      
      // Append image and dish to the DOM
      const appendBottom = document.querySelector(".bottom")
      appendBottom.append(image)
      appendBottom.append(dish)
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

  // Plug the search value into the fetchData function
  fetchData(searchValue)

  // Reset the form after the submit button has been clicked
  document.querySelector("#search-value").value = ""
})

// removeResults function to take out previous search results
function removeResults() {
  
  // Store the div with class "bottom" in a variable (This is where search results are displayed)
  const bottom = document.querySelector(".bottom")

  // Loop through the child elements of the div, removing each one until there are none left
  while (bottom.lastChild) {
    bottom.removeChild(bottom.lastChild)
  }
}