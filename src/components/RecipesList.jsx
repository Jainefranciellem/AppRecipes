import React, { useContext } from 'react';
import { useHistory } from 'react-router-dom';
import RecipesContext from '../context/RecipesContext';

export default function RecipesList() {
  const { recipes, stateApi } = useContext(RecipesContext);
  const history = useHistory();

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

  return (
    <div>
      {
        stateApi === 'food'
          ? recipes?.map((recipe) => (
            <div key={ recipe.idMeal }>
              <p>{recipe.strMeal}</p>
            </div>
          ))
          : recipes?.map((recipe) => (
            <div key={ recipe.idDrink }>
              <p>{recipe.strDrink}</p>
            </div>
          ))
      }
    </div>
  );
}
