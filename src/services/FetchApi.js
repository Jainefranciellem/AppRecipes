export const fetchApiIngredients = async (ingredients) => {
  const ingredientApi = await fetch(`https://www.themealdb.com/api/json/v1/1/filter.php?i=${ingredients}`);
  const data = await ingredientApi.json();
  return data;
};

export const fetchApiName = async (name) => {
  const nameApi = await fetch(`https://www.themealdb.com/api/json/v1/1/search.php?s=${name}`);
  const data = await nameApi.json();
  return data;
};

export const fetchApiFirstLetter = async (FirstLetter) => {
  if (FirstLetter.length > 1) {
    global.alert('Your search must have only 1 (one) character');
  } else {
    const FirstLetterApi = await fetch(`https://www.themealdb.com/api/json/v1/1/search.php?f=${FirstLetter}`);
    const data = await FirstLetterApi.json();
    return data;
  }
};
