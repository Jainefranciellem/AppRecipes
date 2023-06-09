import React, { useContext, useEffect, useState } from 'react';
import { useHistory, useLocation, useParams, useRouteMatch } from 'react-router-dom';
// import clipboard from 'clipboard-copy';
import style from './RecipeInProgress.module.css';
import RecipesContext from '../context/RecipesContext';
import ButtonFavorite from '../components/ButtonFavorite';
import ButtonShare from '../components/ButtonShare';
import { fetchIdDrinks, fetchIdFood } from '../services/FetchApi';
import '../style/RecipeInProgress.css';

function RecipeInProgress() {
  const { alert } = useContext(RecipesContext);
  const [done, setDone] = useState([]); // marked input array
  const [goLs2, setGoLs2] = useState([]); // accumulator
  const [lockLs, setLockLs] = useState(false);// lock to prevent the localstorage from being updated more than once
  const [responseApi, setResponseApi] = useState([]); // response from the api
  const [ingredient, setIngredient] = useState([]); // array of ingredients
  const [amount, setAmount] = useState([]); // array of amounts

  const { pathname } = useLocation();
  const { id } = useParams();
  const match = useRouteMatch();
  const { push } = useHistory();

  const params = pathname.slice(1).split('/');
  const typeRecipes = params[0];

  /**
   * function responsible for getting from localstorage the ingredients already used
   */
  const lsRecovery2 = () => {
    const mealsOrDrinks = match.url.split('/')[1]; // captures whether it is the meals or drinks route to be used as a key
    const recipeKey = match.params.id; // captures the id of the recipe to be used as a key

    const lsSaved = JSON.parse(localStorage
      .getItem('inProgressRecipes')) ?? {
      meals: {},
      drinks: {},
    };

    setGoLs2(lsSaved[mealsOrDrinks][recipeKey]);
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
   * function responsible for receiving the result from the api and extracting the ingredients and their respective quantities from within it
   * @param {*} x - response from the api
   */
  const getIngredients = (x) => {
    const ingredients = [];
    const measures = [];
    const max = 20;
    for (let i = 1; i <= max; i += 1) {
      const ingredientName = `strIngredient${i}`;
      const measureName = `strMeasure${i}`;
      if (x?.[0]?.[ingredientName]) {
        ingredients.push(x[0][ingredientName]);
        measures.push(x[0][measureName]);
      }
    }
    setIngredient(ingredients);
    setAmount(measures);
  };

  /**
   * save object in localStorage
   */
  const savedLocalStorage = () => {
    const qualquer = '/done-recipes';
    push(qualquer);

    const newObj = {
      id: responseApi[0]?.idMeal ?? responseApi[0]?.idDrink,
      nationality: responseApi[0]?.strArea ?? '',
      name: responseApi[0]?.strMeal ?? responseApi[0]?.strDrink,
      category: responseApi[0]?.strCategory ?? responseApi[0]?.strAlcoholic,
      image: responseApi[0]?.strMealThumb ?? responseApi[0]?.strDrinkThumb,
      tags: responseApi[0]?.strTags ? responseApi[0]?.strTags.split(',') : [],
      alcoholicOrNot: responseApi[0]?.strAlcoholic ?? '',
      type: typeRecipes.slice(0, typeRecipes.length - 1),
      doneDate: new Date().toISOString(),
    };

    const ls = JSON.parse(localStorage.getItem('doneRecipes')) ?? [];
    localStorage.setItem('doneRecipes', JSON.stringify([...ls, newObj]));
  };

  /**
   * function responsible for executing requests to the api
   */
  useEffect(() => {
    const fetchById = async () => {
      if (typeRecipes === 'drinks') {
        const recipeDrink = await fetchIdDrinks(id);
        const { drinks } = recipeDrink;
        setResponseApi(drinks);
        getIngredients(drinks);
      } else {
        const recipeFood = await fetchIdFood(id);
        const { meals } = recipeFood;
        setResponseApi(meals);
        getIngredients(meals);
      }
    };
    fetchById();
  }, []);

  /**
   * function responsible for updating the localstorage and getting the ingredients already used
   */
  useEffect(() => {
    if (lockLs) { checkedList(); }
    lsRecovery2();
  }, [done]);

  return (
    <div>
      <div className="divImgAndName">
        <ButtonFavorite
          className="buttonFavorite"
          typeRecipe={ responseApi }
          typeRecipes={ typeRecipes }
          id={ id }
        />
        <ButtonShare
          className="buttonShare"
          pathname={ pathname }
        />
        { alert && <p>Link copied!</p> }
        <img
          className="imgDetails"
          data-testid="recipe-photo"
          src={ responseApi[0]?.strMealThumb ?? responseApi[0]?.strDrinkThumb }
          alt=""
        />
        <h1
          className="nameDetails"
          data-testid="recipe-title"
        >
          { responseApi[0]?.strMeal ?? responseApi[0]?.strDrink }
        </h1>
      </div>
      <br />
      <div className="containerDetails">
        <h3 className="h3-ingredients">Ingredients</h3>
        <div className="divIngredients">
          { ingredient?.map((ingredientRecipe, i) => (
            <label
              id="list"
              key={ `${ingredientRecipe}-${i}` }
              data-testid={ `${i}-ingredient-step` }
              className={ `${goLs2
                ?.includes(ingredientRecipe) && style['list-of-ingredients']}` }
            >
              <input
                type="checkbox"
                className="checkbox"
                checked={ goLs2?.includes(ingredientRecipe) }
                onChange={ () => {
                  setDone((prev) => {
                    if (prev?.includes(ingredientRecipe)) {
                      return prev?.filter((element) => element !== ingredientRecipe);
                    }
                    return [...prev, ingredientRecipe];
                  });
                  setLockLs(true);
                } }
              />
              { `${ingredientRecipe}: ${amount[i]}` }
            </label>
          ))}
        </div>
        <h3 className="h3-instruction">Instructions</h3>
        <p data-testid="instructions" className="divInstructions">
          { responseApi[0]?.strInstructions ?? responseApi[0]?.strInstructions }
        </p>
      </div>
      <button
        className="startBtn"
        data-testid="finish-recipe-btn"
        type="button"
        disabled={ ingredient?.length !== goLs2?.length }
        onClick={ savedLocalStorage }
      >
        Recipe finished
      </button>
    </div>
  );
}
export default RecipeInProgress;
