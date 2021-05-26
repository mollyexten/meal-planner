function createMainImage(recipe) {
  let mainImage = document.createElement("img")
  mainImage.src = recipe.strMealThumb
  mainImage.alt = "random photo of food"
  mainImage.id = recipe.idMeal
  mainImage.className = "background-image"
  return mainImage
}