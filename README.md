# Project Overview

## Meal Planner

[Your deployed site] ("url in strings")

## Project Description

The meal planner application enables a user to look up recipes based on the ingredients they have using the TheMealDB API. The search results will include links to the full recipes, with an ingredient list and directions.

## API and Data Sample

Here is a link for [Honey Teriyaki Salmon](https://www.themealdb.com/api/json/v1/1/search.php?s=honey%20teriyaki%20salmon)
```{
    "meals": [
        {
            "idMeal": "52773",
            "strMeal": "Honey Teriyaki Salmon",
            "strDrinkAlternate": null,
            "strCategory": "Seafood",
            "strArea": "Japanese",
            "strInstructions": "Mix all the ingredients in the Honey Teriyaki Glaze together. Whisk to blend well. Combine the salmon and the Glaze together.\r\n\r\nHeat up a skillet on medium-low heat. Add the oil, Pan-fry the salmon on both sides until it’s completely cooked inside and the glaze thickens.\r\n\r\nGarnish with sesame and serve immediately.",
            "strMealThumb": "https://www.themealdb.com/images/media/meals/xxyupu1468262513.jpg",
            "strTags": "Fish,Breakfast,DateNight",
            "strYoutube": "https://www.youtube.com/watch?v=4MpYuaJsvRw",
            "strIngredient1": "Salmon",
            "strIngredient2": "Olive oil",
            "strIngredient3": "Soy Sauce",
            "strIngredient4": "Sake",
            "strIngredient5": "Sesame Seed",
            "strIngredient6": "",
            "strIngredient7": "",
            "strIngredient8": "",
            "strIngredient9": "",
            "strIngredient10": "",
            "strIngredient11": "",
            "strIngredient12": "",
            "strIngredient13": "",
            "strIngredient14": "",
            "strIngredient15": "",
            "strIngredient16": null,
            "strIngredient17": null,
            "strIngredient18": null,
            "strIngredient19": null,
            "strIngredient20": null,
            "strMeasure1": "1 lb",
            "strMeasure2": "1 tablespoon",
            "strMeasure3": "2 tablespoons",
            "strMeasure4": "2 tablespoons",
            "strMeasure5": "4 tablespoons",
            "strMeasure6": "",
            "strMeasure7": "",
            "strMeasure8": "",
            "strMeasure9": "",
            "strMeasure10": "",
            "strMeasure11": "",
            "strMeasure12": "",
            "strMeasure13": "",
            "strMeasure14": "",
            "strMeasure15": "",
            "strMeasure16": null,
            "strMeasure17": null,
            "strMeasure18": null,
            "strMeasure19": null,
            "strMeasure20": null,
            "strSource": null,
            "dateModified": null
        }
    ]
}
```
## Wireframes

[Meal Planner Search](https://wireframe.cc/pro/pp/64297a170417181)<br />
[Meal Planner Recipe](https://wireframe.cc/pro/pp/e0d6f63c3417182)<br />
Both wireframes are also included as PDFs in this GitHub repo.

### MVP/PostMVP

#### MVP 

- Use Axios to make a request to TheMealDB API
- Insert information on ingredients, dishes, photos, and directions to the DOM
- Render search results for a specific ingredient on page
- Make functioning links for dishes that pull up a recipe 
- Style using Flexbox
- Implement responsive design (mobile-first design)
- Use a media query/breakpoint for desktop screens

#### PostMVP  

- Add a save recipe button to collect recipes in a recipe box via window.localStorage (.setItem)
- Aggregate ingredients from saved recipes into a master grocery list
- Include quantities of ingredients needed on master grocery list

## Project Schedule

|  Day | Deliverable | Status
|---|---| ---|
|Feb 22-23| Prompt / Wireframes / Priority Matrix / Timeframes | Complete
|Feb 23| Project Approval | Complete
|Feb 23-4| Core Application Structure HTML / app.js | Incomplete
|Feb 24| Initial Clickable Model  | Incomplete
|Feb 25| MVP | Incomplete
|Feb 26| Styling | Incomplete
|March 1| Presentations | Incomplete

## Priority Matrix

[View here](https://lucid.app/lucidchart/invitations/accept/63606aaf-2d9b-44a4-9998-4dac62063c38)<br />
The priority matrix can also be viewed as a PDF in this GitHub repo.

## Timeframes

| Component | Priority | Estimated Time | Time Invested | Actual Time |
| --- | :---: |  :---: | :---: | :---: |
| Creating Basic HTML Template | H | 1 hr | 30 min |  |
| Understanding API | H | 2 hrs | 15 min |  |
| Create click event for search bar info | H | 1 hr | 15 min |  |
| Render recipe results to page via DOM | H | 2 hrs | 15 min |  |
| Create remove results function | H | 1 hrs | 15 min |  |
| Append specific recipe info to page via DOM | H | 2 hrs |  |  |
| Click event to redirect to specific recipe | H | 2 hrs |  |  |
| Format photos appended to DOM | H | 1 hrs |  |  |
| Flexbox for index page | H | 2 hrs |  |  |
| Flexbox for search results | H | 3 hrs |  |  |
| Flexbox for individual recipes | H | 2 hrs |  |  |
| CSS color styling | H | 1 hr |  |  |
| Add icons to CSS | H | 1.5 hrs |  |  |
| Media query for desktop - index | H | 2 hrs |  |  |
| Media query for desktop - search | H | 2 hrs |  |  |
| Media query for desktop - recipe | H | 2 hrs |  |  |
| Create a "save recipes" function | H | 3hrs|  |  |
| Display saved recipes in recipe-box page | H | 2 hrs |  |  |
| Compile saved recipes' ingredients to grocery list | H | 3 hrs |  |  |
| Add amounts to grocery list | H | 3 hrs |  |  |
| Organize final CSS | H | 1 hr |  |  |
| Total | H | 40 hrs|  |  |

## Code Snippet

(Coming soon) I am proud of this piece of my code:

```
function codey(mcCoderson) {
	// codey code code
}
```

## Change Log
I will use this section to document what changes were made and the reasoning behind those changes.  
