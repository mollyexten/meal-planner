// API doc https://www.themealdb.com/api/json/v1/1/filter.php?i=rice

// Create a fetchData() function to capture search results based on ingredient


async function fetchData(ingredient) {
  // Eventually I will add the removeResults() function here - after I make it, obviously!
  // For now the ingredient will be hardcoded in when I invoke this funciton, but eventually it will be captured via an event listener
  const url = `https://www.themealdb.com/api/json/v1/1/filter.php?i=${ingredient}`
  // Make the try/catch function
  try {
    let response = await axios.get(url)
    let recipes = response.data.meals
    recipes.forEach((recipe) => {
      let image = document.createElement("img")
      image.src = recipe.strMealThumb
      image.width = "200"
      let dish = document.createElement("p")
      dish.textContent = recipe.strMeal
      console.log(`recipe id for link (later) ${recipe.idMeal}`)
      const appendDiv = document.querySelector(".container")
      appendDiv.append(image)
      appendDiv.append(dish)
    })
    return response
  } catch (err) {
    console.error(err)
  }
}

const form = document.querySelector("form")
form.addEventListener("submit", (e) => {
  e.preventDefault()
  const searchValue = document.querySelector("#search-value").value
  fetchData(searchValue)
})