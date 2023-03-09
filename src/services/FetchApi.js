export const fetchFoodIngredients = async (ingredients) => {
  const ingredientApi = await fetch(`https://www.themealdb.com/api/json/v1/1/filter.php?i=${ingredients}`);
  const data = await ingredientApi.json();
  return data.meals;
};

export const fetchFoodName = async (name) => {
  const nameApi = await fetch(`https://www.themealdb.com/api/json/v1/1/search.php?s=${name}`);
  const data = await nameApi.json();
  return data.meals;
};

export const fetchFoodFirstLetter = async (FirstLetter) => {
  if (FirstLetter.length > 1) {
    global.alert('Your search must have only 1 (one) character');
  } else {
    const FirstLetterApi = await fetch(`https://www.themealdb.com/api/json/v1/1/search.php?f=${FirstLetter}`);
    const data = await FirstLetterApi.json();
    return data.meals;
  }
};

export const fetchDrinksIngredients = async (ingredients) => {
  const ingredientApi = await fetch(`https://www.thecocktaildb.com/api/json/v1/1/filter.php?i=${ingredients}`);
  const data = await ingredientApi.json();
  return data.drinks;
};

export const fetchDrinksName = async (name) => {
  const nameApi = await fetch(`https://www.thecocktaildb.com/api/json/v1/1/search.php?s=${name}`);
  const data = await nameApi.json();
  return data.drinks;
};

export const fetchDrinksFirstLetter = async (FirstLetter) => {
  if (FirstLetter.length > 1) {
    global.alert('Your search must have only 1 (one) character');
  } else {
    const FirstLetterApi = await fetch(`https://www.thecocktaildb.com/api/json/v1/1/search.php?f=${FirstLetter}`);
    const data = await FirstLetterApi.json();
    return data.drinks;
  }
};
export const fetchIdFood = async (idFood) => {
  const responseID = await fetch(`https://www.themealdb.com/api/json/v1/1/lookup.php?i=${idFood}`);
  const data = await responseID.json();
  return data;
};

export const fetchIdDrinks = async (idDrinks) => {
  const responseID = await fetch(`https://www.thecocktaildb.com/api/json/v1/1/lookup.php?i=${idDrinks}`);
  const data = await responseID.json();
  return data;
};

export const fetchFoodsDrink = async () => {
  const response = await fetch('https://www.thecocktaildb.com/api/json/v1/1/search.php?s=');
  const data = await response.json();
  const { drinks } = data;
  return drinks;
};

export const fetchFoodsMeal = async () => {
  const response = await fetch('https://www.themealdb.com/api/json/v1/1/search.php?s=');
  const data = await response.json();
  const { meals } = data;
  return meals;
};
