let favMeals=JSON.parse(localStorage.getItem('favMeals'));
var mealsList=document.getElementById("meals-list");

const fetchData=async (mealId)=>{
    try {
        let res=await fetch(`https://www.themealdb.com/api/json/v1/1/lookup.php?i=${mealId}`);
        let result=await res.json();
        displayResults(result.meals[0]);
    } catch (error) {
        console.error(error);
    }
}

const showFav=()=>{
    
    if(favMeals.length===0){
        mealsList.innerHTML='<h1>No Favourite Meals Present</h1>'
    }else{
        mealsList.innerHTML='';
        favMeals.map((mealId)=>{
            fetchData(mealId);
        })
    }
}

const displayResults=(meal)=>{
    let isFav=true;
    mealsList.innerHTML +=`<li class="meal">
    <img src="${meal.strMealThumb}" /img>
     <div class="meal-name" id="${meal.idMeal}">
     <h2 class="recipe-name">${meal.strMeal}</h2> 
     <i class="${ isFav ? 'fas' : 'far' } fa-heart fav-btn"></i>
     </div>
     </li>`;
}

mealsList.addEventListener('click',(e)=>{
    if(e.target.className == 'recipe-name'){
        let recipeId=e.target.parentNode.id;
        window.open(`detail.html?id=${recipeId}`);
    }else if(e.target.classList.contains('fav-btn')){
        let recipeId=e.target.parentNode.id;
        let localArray=JSON.parse(localStorage.getItem('favMeals'));
        localArray=localArray.filter((item)=> item != recipeId);
        localStorage.setItem('favMeals',JSON.stringify(localArray));
        favMeals=JSON.parse(localStorage.getItem('favMeals'));
        alert('Removed From Favourites');
        showFav();
    }
})


showFav();

