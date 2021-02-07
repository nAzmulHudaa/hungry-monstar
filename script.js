const searchBtn = document.getElementById('searchButton');
const meals = document.getElementById('meal');
const mealDetails = document.querySelector('.meal-details-content');
const closeBtn = document.getElementById('recipe-close-btn');

// event listeners
searchBtn.addEventListener('click', mealsList);
meals.addEventListener('click', mealRecipe);
closeBtn.addEventListener('click', () => {
    mealDetails.parentElement.classList.remove('showRecipe');
});


// get meal list that matches with the ingredients
function mealsList(){
    let searchInputTxt = document.getElementById('input').value.trim();
    fetch(`https://www.themealdb.com/api/json/v1/1/filter.php?i=${searchInputTxt}`)
    .then(response => response.json())
    .then(data => {
        let html = "";
        if(data.meals){
            data.meals.forEach(meal => {
                html += `
                    <div class = "meal-item" data-id = "${meal.idMeal}">
                        <div class = "meal-img">
                            <img src = "${meal.strMealThumb}" alt = "food">
                        </div>
                        <div class = "meal-name">
                            <h3>${meal.strMeal}</h3>
                            <a href = "#" class = "recipe-btn">Get Recipe</a>
                        </div>
                    </div>
                `;
            });
            meals.classList.remove('notFound');
        } else{
            html = "Sorry, we didn't find any meal!";
            meals.classList.add('notFound');
        }

        meals.innerHTML = html;
    });
}
function mealRecipe(e){
    e.preventDefault();
    if(e.target.classList.contains('recipe-btn')){
        let mealItem = e.target.parentElement.parentElement;
        fetch(`https://www.themealdb.com/api/json/v1/1/lookup.php?i=${mealItem.dataset.id}`)
        .then(response => response.json())
        .then(data => modal(data.meals));
    }
}

// create a modal
function modal(meal){
    console.log(meal);
    meal = meal[0];
    let html = `
        <h2 class = "recipe-title">${meal.strMeal}</h2>
        <p class = "recipe-category">${meal.strCategory}</p>
        <div class = "recipe-instruct">
            <h3>Instructions:</h3>
            <p>${meal.strInstructions}</p>
        </div>
        <div class = "recipe-meal-img">
            <img src = "${meal.strMealThumb}" alt = "">
        </div>
       
    `;
    mealDetails.innerHTML = html;
    mealDetails.parentElement.classList.add('showRecipe');
}
