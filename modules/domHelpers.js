export function createMainImage(recipeInfo) {
  let mainImage = document.createElement("img")
  mainImage.src = recipeInfo.strMealThumb
  mainImage.alt = "random photo of food"
  mainImage.id = recipeInfo.idMeal
  mainImage.className = "background-image"
  return mainImage
}