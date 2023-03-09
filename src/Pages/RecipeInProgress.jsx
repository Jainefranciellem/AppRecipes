import React, { useEffect, useState } from 'react';
import { useRouteMatch } from 'react-router-dom';
import style from './RecipeInProgress.module.css';

function RecipeInProgress() {
  const [test, setTest] = useState([]); // array used in mocked file
  const [done, setDone] = useState([]); // marked input array
  const [goLs, setGoLs] = useState([]); // array retrieved from localstorage
  const [lockLs, setLockLs] = useState(false);

  // const location = useLocation();
  const match = useRouteMatch();

  const testDrinks = [
    'Drinks-1',
    'Drinks-2',
    'Drinks-3',
  ];
  const testMeals = [
    'Meals-1',
    'Meals-2',
    'Meals-3',
    'Meals-4',
    'Meals-5',
    'Meals-6',
    'Meals-7',
    'Meals-8',
  ];

  /**
   * função resposavel por "setar o localstorage para testar o component"
   * @param {*} x recebe o ID do item
   */
  const saveLs = (x) => {
    localStorage.setItem('inProgress', JSON
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
      .getItem('inProgress'))[mealsOrDrinks][recipeKey];
    setTest(lsSaved);
  };

  /**
   * retrieves information from localstorage and saves it in the "goLs" state to update already tagged entries
   */
  const checkedInputRecovery = () => {
    const mealsOrDrinks = match.url.split('/')[1]; // captures whether it is the meals or drinks route to be used as a key
    const recipeKey = match.params.id; // captures the id of the recipe to be used as a key

    const ls = JSON.parse(localStorage.getItem('inProgressRecipes')) ?? {
      meals: {},
      drinks: {},
    };

    setGoLs(ls[mealsOrDrinks][recipeKey]);
  };

  /**
   * function responsible for updating the localstorage with the marked inputs
   */
  const checkedList = () => {
    const mealsOrDrinks = match.url.split('/')[1]; // captures whether it is the meals or drinks route to be used as a key
    const recipeKey = match.params.id; // captures the id of the recipe to be used as a key

    const algo2 = JSON.parse(localStorage.getItem('inProgressRecipes')) ?? {
      meals: {},
      drinks: {},
    };

    localStorage.setItem('inProgressRecipes', JSON
      .stringify({
        ...algo2,
        [mealsOrDrinks]: {
          ...algo2[mealsOrDrinks],
          [recipeKey]: done,
        },
      }));
  };

  /**
   * useEffect responsible for calling the function responsible for recovering the localstorage state
   */
  useEffect(() => {
    lsRecovery();
  }, []);

  useEffect(() => {
    if (lockLs) { checkedList(); }
    checkedInputRecovery();
  }, [done]);

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
            key={ `${ingredientRecipe}-${i}` }
            data-testid={ `${i}-ingredient-step` }
            className={ `${goLs
              ?.includes(ingredientRecipe) && style['list-of-ingredients']}` }
          >
            <input
              type="checkbox"
              name=""
              checked={ goLs?.includes(ingredientRecipe) }
              // id="ingredient"
              onChange={ () => {
                setDone((prev) => {
                  if (prev.includes(ingredientRecipe)) {
                    return prev.filter((element) => element !== ingredientRecipe);
                  }
                  return [...prev, ingredientRecipe];
                });
                setLockLs(true);
              } }
            />
            { `${ingredientRecipe}` }
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
