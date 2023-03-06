import React, { useContext, useEffect } from 'react';
import { useHistory } from 'react-router-dom';
import RecipesContext from '../context/RecipesContext';

export default function RecipesList() {
  const { recipes, stateApi, setRecipes } = useContext(RecipesContext);
  const history = useHistory();
  const maxNumber = 12;

  const verifyLength = () => {
    if (stateApi === 'food') {
      if (recipes?.length === 1) {
        history.push(`/meals/${recipes[0].idMeal}`);
      }
    } else if (recipes?.length === 1) {
      history.push(`/drinks/${recipes[0].idDrink}`);
    }
  };
  verifyLength();

  useEffect(() => {
    const fetchFoods = async () => {
      if (stateApi === 'food') {
        const response = await fetch('https://www.themealdb.com/api/json/v1/1/search.php?s=');
        const data = await response.json();
        setRecipes(data.meals);
      } else {
        const response = await fetch('https://www.thecocktaildb.com/api/json/v1/1/search.php?s=');
        const data = await response.json();
        setRecipes(data.drinks);
      }
    };

    fetchFoods();
  }, [stateApi]);

  return (
    <div>
      {
        stateApi === 'food'
          ? recipes?.slice(0, maxNumber).map((recipe, i) => (
            <div data-testid={ `${i}-recipe-card` } key={ `recipe.idMeal ${i}` }>
              <p data-testid={ `${i}-card-name` }>{ recipe.strMeal }</p>
              <img
                data-testid={ `${i}-card-img` }
                src={ recipe.strMealThumb }
                alt={ recipe.strMeal }
              />
            </div>
          ))
          : recipes?.slice(0, maxNumber).map((recipe, i) => (
            <div data-testid={ `${i}-recipe-card` } key={ `recipe.idDrink ${i}` }>
              <p data-testid={ `${i}-card-name` }>{recipe.strDrink}</p>
              <img
                data-testid={ `${i}-card-img` }
                src={ recipe.strDrinkThumb }
                alt={ recipe.strDrink }
              />
            </div>
          ))
      }
    </div>
  );
}
