var searchBar = document.getElementById("searchBar");
var mealsList=document.getElementById("meals-list");
var searchBtn=document.getElementById("search-btn");

searchBar.addEventListener('keyup',(e)=>{
    const searchString=e.target.value.toLowerCase();
    searchResult(searchString)
    
})

searchBtn.addEventListener('click',()=>{
    const searchString=searchBar.value.toLowerCase();
    searchResult(searchString)
})

const searchResult=async (searchString)=>{
    try{
        const res= await fetch(`https://www.themealdb.com/api/json/v1/1/search.php?s=${searchString}`);
        var result=await res.json();
        displayResults(result.meals);
    } catch(err){
        console.error(err);
    }
}

const displayResults=(meals)=>{
    let localArray = JSON.parse(localStorage.getItem('favMeals'));
    if(meals===null){
        mealsList.innerHTML='<h1> No Meal Availaible</h1>'
    }else{
        const mealString=meals.map((meal)=>{
            let recipeId=meal.idMeal;
            let isFav=false;
            if(localArray.indexOf(recipeId) !=-1 ){
                isFav=true;
            }
            return `<li class="meal">
            <img src="${meal.strMealThumb}" /img>
             <div class="meal-name" id="${meal.idMeal}">
             <h2 class="recipe-name">${meal.strMeal}</h2> 
             <i class="${ isFav ? 'fas' : 'far' } fa-heart fav-btn"></i>
             </div>
             </li>`;
     
         }).join('');
         mealsList.innerHTML=mealString;
    }
   
}

function initializeLocalstorage(){
    let localArray = [];
    if(localStorage.getItem('favMeals') == null){
        //create a new localStorage
        localStorage.setItem('favMeals',JSON.stringify(localArray));
    }
}

mealsList.addEventListener('click',(e)=>{ 
    if(e.target.className == 'recipe-name'){
        let recipeId= e.target.parentNode.id;
        window.open(`detail.html?id=${recipeId}`);
    }else if(e.target.classList.contains('fav-btn')){
        let recipeId=e.target.parentNode.id;
        let localArray = JSON.parse(localStorage.getItem('favMeals'));
        if(localArray.indexOf(recipeId) != -1 ){
            localArray=localArray.filter((item)=> item != recipeId)
            localStorage.setItem('favMeals',JSON.stringify(localArray));
            e.target.classList.remove('fas');
            e.target.classList.add('far');
        }else{
            localArray.push(recipeId);
            localStorage.setItem('favMeals',JSON.stringify(localArray));
            e.target.classList.remove('far');
            e.target.classList.add('fas');
            alert('Added to Favourites')
        }
    }
})


document.addEventListener('DOMContentLoaded',initializeLocalstorage);