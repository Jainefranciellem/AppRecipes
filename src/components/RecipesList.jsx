import React, { useContext } from 'react';
import RecipesContext from '../context/RecipesContext';

export default function RecipesList() {
  const { recipes, stateApi } = useContext(RecipesContext);
  return (
    <div>
      {
        stateApi === 'food'
          ? recipes.map((recipe) => (
            <div key={ recipe.idMeal }>
              <p>{recipe.strMeal}</p>
            </div>
          ))
          : recipes.map((recipe) => (
            <div key={ recipe.idDrink }>
              <p>{recipe.strDrink}</p>
            </div>
          ))
      }
    </div>
  );
}
