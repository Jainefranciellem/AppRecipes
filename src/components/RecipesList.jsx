import React, { useContext, useEffect } from 'react';
import { Link, useHistory } from 'react-router-dom';
import RecipesContext from '../context/RecipesContext';
import '../style/RecipesList.css';

export default function RecipesList() {
  const { recipes, stateApi, setRecipes, recipesFiltered } = useContext(RecipesContext);
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
    <div className="containerList">

      {
        stateApi === 'food'
          && (recipesFiltered.length > 0 ? recipesFiltered : recipes)
            ?.slice(0, maxNumber).map((recipe, i) => (
              <Link
                className="link"
                to={ `/meals/${recipe.idMeal}` }
                data-testid={ `${i}-recipe-card` }
                key={ `${recipe.idMeal} ${i}` }
              >
                <div className="cardRecipe">
                  <img
                    className="imgRecipe"
                    data-testid={ `${i}-card-img` }
                    src={ recipe.strMealThumb }
                    alt={ recipe.strMeal }
                  />
                  <p
                    className="nameRecipe"
                    data-testid={ `${i}-card-name` }
                  >
                    { recipe.strMeal }
                  </p>
                </div>
              </Link>
            ))
      }
      { stateApi === 'drinks'
          && (recipesFiltered.length > 0 ? recipesFiltered : recipes)
            ?.slice(0, maxNumber).map((recipe, i) => (
              <Link
                to={ `/drinks/${recipe.idDrink}` }
                data-testid={ `${i}-recipe-card` }
                key={ `${recipe.idDrink} ${i}` }
              >
                <p data-testid={ `${i}-card-name` }>{recipe.strDrink}</p>
                <img
                  data-testid={ `${i}-card-img` }
                  src={ recipe.strDrinkThumb }
                  alt={ recipe.strDrink }
                />
              </Link>
            ))}
    </div>
  );
}
