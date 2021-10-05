let queryString = window.location.search;
let urlParams = new URLSearchParams(queryString);
// get recipeId
let recipeId=urlParams.get('id');


const getDetails=async (recipeId)=>{
    try{
        //create dynamic url
        const res=await fetch(`https://www.themealdb.com/api/json/v1/1/lookup.php?i=${recipeId}`);
        const data=await res.json()
        showDetails(data);
    }catch(err){
        console.error(err);
    }
}


const showDetails=(meal)=>{
    // console.log("meals==>",meal.meals[0].strCategory )
    const photo=document.getElementById("pic");
    photo.innerHTML=`<img src=${meal.meals[0].strMealThumb}>`;
    const name=document.getElementById("name");
    name.innerText="Name : "+meal.meals[0].strMeal;
    const category=document.getElementById('category');
    category.innerText="Category : "+ meal.meals[0].strCategory;
    const instruction=document.getElementById("instruction");
    instruction.innerText="Instruction : " + meal.meals[0].strInstructions;
}

getDetails(recipeId)