import React, { useEffect, useState } from 'react';
import { useRouteMatch } from 'react-router-dom';
import style from './RecipeInProgress.module.css';

function RecipeInProgress() {
  const [test, setTest] = useState([]);
  const [done, setDone] = useState({});

  // const location = useLocation();
  const match = useRouteMatch();

  const testDrinks = [
    { algo: 'Drinks', measure: ['1'] },
    { algo: 'Drinks', measure: ['1'] },
    { algo: 'Drinks', measure: ['1'] },
  ];
  const testMeals = [
    { algo: 'Meals', measure: ['1'] },
    { algo: 'Meals', measure: ['1'] },
    { algo: 'Meals', measure: ['1'] },
    { algo: 'Meals', measure: ['1'] },
    { algo: 'Meals', measure: ['1'] },
    { algo: 'Meals', measure: ['1'] },
    { algo: 'Meals', measure: ['1'] },
    { algo: 'Meals', measure: ['1'] },
  ];

  const saveLs = (x) => {
    localStorage.setItem('inProgressRecipes', JSON
      .stringify({ drinks: { [x]: testDrinks }, meals: { [x]: testMeals } }));
  };

  /**
   * responsible for recovering the localstorage state and saving the key in the "state" of the component
   */
  const lsRecovery = () => {
    const mealsOrDrinks = match.url.split('/')[1]; // captures whether it is the meals or drinks route to be used as a key
    const recipeKey = match.params.id; // captures the id of the recipe to be used as a key

    saveLs(recipeKey); // apenas para testes <-----------

    const lsSaved = JSON.parse(localStorage
      .getItem('inProgressRecipes'))[mealsOrDrinks][recipeKey] || [];
    setTest(lsSaved);
  };

  useEffect(() => {
    lsRecovery();
  }, []);

  return (
    <div>
      <h1 data-testid="recipe-title">Nome da Receita</h1>
      <img
        src="https://st2.depositphotos.com/4687049/6972/i/450/depositphotos_69724327-stock-photo-dish-with-meat-rice-and.jpg"
        alt=""
        data-testid="recipe-photo"
      />

      <br />

      <button
        data-testid="share-btn"
      >
        compartilhar
      </button>
      <button
        data-testid="favorite-btn"
      >
        favoritar
      </button>
      <h2 data-testid="recipe-category">Categoria da Receita</h2>
      <h3>Ingredientes</h3>
      <div className={ style.list }>
        {test?.map((ingredientRecipe, i) => (
          <label
            key={ `${ingredientRecipe.algo}-${i}` }
            data-testid={ `${i}-ingredient-step` }
            className={ `${done[i] && style['list-of-ingredients']}` }
          >
            <input
              type="checkbox"
              name=""
              id="ingredient"
              onChange={ ({ target }) => {
                setDone((prev) => ({ ...prev, [i]: target.checked }));
              } }
            />
            { `${ingredientRecipe.algo}: ${ingredientRecipe.measure[0]}` }
          </label>
        ))}

      </div>
      <h3>Instruções</h3>
      <p data-testid="instructions">Instruções da Receita</p>
      <button
        data-testid="finish-recipe-btn"
      >
        Finalizar Receita
      </button>
    </div>
  );
}

export default RecipeInProgress;
