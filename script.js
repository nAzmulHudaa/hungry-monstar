function searchMeals(){
    const searchInput = document.getElementById('search-field').value;
    const url = `https://www.themealdb.com/api/json/v1/1/search.php?s=${searchInput}`;
    fetch(url)
    .then(res => res.json())
    .then(data => {
        // console.log(data);
        getMeals(data.meals);
    })
}


const getMeals = meals =>{
    const mealContainer = document.getElementById('meal-list');
    mealContainer.innerHTML ='';
    meals.forEach(meal=>{
        const mealDiv = document.createElement('div');
        mealDiv.className = 'single-result row justify-content-center m-2 p-3 spacing';
        mealDiv.innerHTML = `
        <div class = "meal" onclick ="details('${meal.idMeal}')">
            <img src = "${meal.strMealThumb}" alt = "food" class = "img-fluid">
            <h3 class = "mt-3">${meal.strMeal}</h3>
            </div>
        </div>`;
        mealContainer.appendChild(mealDiv);
    });
};

const details =(mealNameId) =>{
    const url = `https://www.themealdb.com/api/json/v1/1/lookup.php?i=${mealNameId}`;
    fetch(url)
    .then(res =>res.json())
    .then(data =>{
        getDetails(data.meals);
    })
}


function getDetails(meal1){
    const mealDetails = document.getElementById('meal-details');
    mealDetails.innerHTML ='';
    meal1.forEach(mealDetail=>{
       const detailsDiv = document.createElement('div');
       detailsDiv.className = 'col-md-6 mx-auto';
       detailsDiv.innerHTML = `
       <img src="${mealDetail.strMealThumb}" class= "img-fluid">
       <h3 class = " mt-3">${mealDetail.strMeal}</h3>
       <ul>
       <li>${mealDetail.strIngredient1}</li>
       <li>${mealDetail.strIngredient2}</li>
       <li>${mealDetail.strIngredient3}</li>
       <li>${mealDetail.strIngredient4}</li>
       </ul>
      
       `;
       mealDetails.appendChild(detailsDiv);
    })
}
