export function Hello() {
  console.log("Hello buddo!")
}

export function createMainImage(img) {
  let mainImage = document.createElement("img")
  mainImage.src = img.strMealThumb
  mainImage.alt = "random photo of food"
  mainImage.id = img.idMeal
  mainImage.className = "background-image"
  return mainImage
} 