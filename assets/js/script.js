// will only run once the page (DOM) is ready for JavaScript code to execute
$(document).ready(function () {
  console.log("JS loaded");

  var mealQueryURL;
  var recipeQueryURL;
  var queryKey;
  var ingredient;
  var course;
  var mealType;
  var mealQueryString;
  var healthLabel;
  var recipeID;
  var recipeImg;
  var recipeArray;

  function getMeals(ingredientName, callBack) {
    console.log(ingredientName);

    mealQueryURL = `https://www.themealdb.com/api/json/v1/1/filter.php?i=${ingredientName}`;
    // queryURL = `www.themealdb.com/api/json/v1/1/filter.php?i=${ingredientName}`;

    fetch(mealQueryURL)
      .then(function (response) {
        return response.json();
      })
      .then(function (data) {
        console.log(data);
        var randomMeal =
          data.meals[Math.floor(Math.random() * data.meals.length)];
        console.log(randomMeal);
        recipeID = randomMeal.idMeal;
        callBack(recipeID);
        // return recipeID;
      });
  }

  // TODO: Get recipeID to return the matching ingredients
  function getRecipe(recipeID) {
    // event.preventDefault();
    recipeQueryURL = `https://www.themealdb.com/api/json/v1/1/lookup.php?i=${recipeID}`;

    fetch(recipeQueryURL)
      .then(function (response) {
        return response.json();
      })
      .then(function (data) {
        console.log(data);

        // checks if meals property exists and is not null
        if (data.meals && data.meals.length > 0) {
          //storing meal category in var
          var mealCategory = data.meals[0].strCategory;
          console.log(mealCategory);

          // condition to extract if it is a dessert
          if (mealCategory === "Dessert") {
            // Extracting relevant dessert information from the recipe
            var recipeImage = data.meals[0].strMealThumb;

            // updating HTML
            var dessertImage = $("<img>");
            dessertImage.attr("src", recipeImage);
            dessertImage.attr("alt", "Dessert");

            $("#dessert .container").prepend(dessertImage);
          } else {
            console.log(
              "Keep searching and find me a recipe with that ingredient !! >_<"
            );
            // call getMeals function again to search for more desserts with the same ingredient
            getMeals($("#form-input").val().trim(), getRecipe);
          }
        }
      });
  }

  getRecipe();

  function getCocktail() {
    ingredientCocktail = "";
    queryURL = `www.thecocktaildb.com/api/json/v1/1/lookup.php?i=${ingredientCocktail}`;
  }

  // Attach a click event listener to the search button to trigger the getRecipe function

  $("#search-button").on("click", function (event) {
    event.preventDefault();
    getMeals($("#form-input").val().trim(), getRecipe);

    $("#form-input").val("");
  });

  // &mealType=Breakfast&mealType=Dinner&mealType=Lunch&mealType=Snack&mealType=Teatime
});

//         recipeArray = [];
//         // receipeDiv
//         for (let i = 0; i < 1; i++) {
//             recipeEach = data.hits[i];
//         }

//         recipe = data.hits[0]
//         recipeImg = data.hits[0].recipe.images.LARGE.url;

//         console.log(data.hits);

//     }
//     )
// }
// )
