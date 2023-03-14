import React, { useContext, useEffect, useState } from 'react';
import { useHistory, useLocation, useParams } from 'react-router-dom';
import { fetchIdDrinks, fetchIdFood,
  fetchFoodsDrink, fetchFoodsMeal } from '../services/FetchApi';
import '../style/Details.css';
import ButtonDetails from '../components/ButtonDetails';
import ButtonFavorite from '../components/ButtonFavorite';
import ButtonShare from '../components/ButtonShare';
import RecipesContext from '../context/RecipesContext';

export default function RecipeDetails() {
  const [drink, setDrink] = useState({});
  const [meal, setMeal] = useState({});
  const { alert, typeRecipe, setTypeRecipe } = useContext(RecipesContext);
  const history = useHistory();
  const [recomendation, setRecomendation] = useState(null);
  const [ingredient, setIngredient] = useState('');
  const [measure, setMeasure] = useState(null);
  const { pathname } = useLocation();
  const params = pathname.slice(1).split('/');
  const { id } = useParams();
  const typeRecipes = params[0];
  const maxNumber = 6;

  useEffect(() => {
    const fetchById = async () => {
      if (typeRecipes === 'drinks') {
        const recipeDrink = await fetchIdDrinks(id);
        const { drinks } = recipeDrink;
        setTypeRecipe(drinks);
      } else {
        const recipeFood = await fetchIdFood(id);
        const { meals } = recipeFood;
        setTypeRecipe(meals);
      }
    };
    const fetchAllRecipes = async () => {
      if (typeRecipes === 'drinks') {
        const recipeFood = await fetchFoodsMeal();
        setRecomendation(await recipeFood);
      } else {
        const recipeDrink = await fetchFoodsDrink();
        setRecomendation(recipeDrink);
      }
    };
    fetchAllRecipes();
    fetchById();
  }, []);

  useEffect(() => {
    if (typeRecipe) {
      const keys = Object.keys(typeRecipe[0]);
      const values = Object.values(typeRecipe[0]);
      const ingredients = values.filter((ingredientRecipe, i) => {
        if (keys[i].includes('strIngredient')) {
          return ingredientRecipe;
        }
        return '';
      });
      const measures = values.filter((measureRecipe, i) => {
        if (keys[i].includes('strMeasure')) {
          return measureRecipe;
        }
        return '';
      });
      setIngredient(ingredients);
      setMeasure(measures);
    }
  }, [typeRecipe]);

  useEffect(() => {
    if (localStorage.getItem('inProgressRecipes') !== null) {
      const obj = JSON.parse(localStorage.getItem('inProgressRecipes'));
      setDrink(obj.drinks);
      setMeal(obj.meals);
    }
  }, []);

  useEffect(() => {
    const obj = {
      drinks: {
        ...drink,
      },
      meals: {
        ...meal,
      },
    };
    localStorage.setItem('inProgressRecipes', JSON.stringify(obj));
  }, [drink, meal]);

  const startRecipe = () => {
    if (typeRecipes === 'meals') {
      setMeal({ ...meal, [id]: ingredient });
    } else {
      setDrink({ ...drink, [id]: ingredient });
    }
    const duration = 3000;
    setTimeout(() => {
      history.push(`/${typeRecipes}/${id}/in-progress`);
    }, duration);
  };
  if (typeRecipe) {
    return (
      <div>
        <div className="divImgAndName">
          <ButtonFavorite
            className="buttonFavorite"
            typeRecipe={ typeRecipe }
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
            width="300px"
            src={ typeRecipes === 'meals' ? typeRecipe[0].strMealThumb
              : typeRecipe[0].strDrinkThumb }
            alt=""
          />
          <h1
            className="nameDetails"
            data-testid="recipe-title"
          >
            { typeRecipes === 'meals' ? typeRecipe[0].strMeal : typeRecipe[0].strDrink }
          </h1>
        </div>
        <div className="containerDetails">
          <h3 className="h3-ingredients">Ingredients</h3>
          <div className="divIngredients">
            { ingredient && ingredient?.map((ingredientRecipe, i) => (
              <li
                className="li"
                key={ i }
                data-testid={ `${i}-ingredient-name-and-measure` }
              >
                { `${ingredientRecipe}: ${measure[i]}` }
              </li>
            ))}
          </div>
          <h3 className="h3-instruction">Instructions</h3>
          <p className="divInstructions" data-testid="instructions">
            { typeRecipes === 'meals' ? typeRecipe[0].strInstructions
              : typeRecipe[0].strInstructions }
          </p>
          { typeRecipes === 'meals' && (
            <div>
              <h3 className="h3-youtube">Recipe Video</h3>
              <div className="div-youtube">
                <iframe
                  data-testid="video"
                  title="Video"
                  frameBorder="0"
                  src={ typeRecipe[0].strYoutube }
                  allowFullScreen
                >
                  Video
                </iframe>
              </div>
            </div>
          )}
          <h3 className="h3-Recommended">Recommended</h3>
          <div className="divRecomendation">
            {
              recomendation && (
                typeRecipes === 'drinks'
                  ? recomendation?.slice(0, maxNumber).map((recipe, i) => (
                    <div
                      className="divNameAndImg"
                      data-testid={ `${i}-recommendation-card` }
                      key={ `recipe.idMeal ${i}` }
                    >
                      <img
                        className="imgRecipe"
                        data-testid="recipe-photo"
                        src={ recipe.strMealThumb }
                        alt="recomendation drinks"
                      />
                      <p
                        className="nameRecipe"
                        data-testid={ `${i}-recommendation-title` }
                      >
                        {recipe.strMeal}
                      </p>
                    </div>
                  ))
                  : recomendation?.slice(0, maxNumber).map((recipe, i) => (
                    <div
                      className="divNameAndImg"
                      data-testid={ `${i}-recommendation-card` }
                      key={ `recipe.idDrink ${i}` }
                    >
                      <img
                        className="imgRecipe"
                        data-testid="recipe-photo"
                        src={ recipe.strDrinkThumb }
                        alt="recomendation drinks"
                      />
                      <p
                        className="nameRecipe"
                        data-testid={ `${i}-recommendation-title` }
                      >
                        {recipe.strDrink}
                      </p>
                    </div>
                  ))
              )
            }
          </div>
        </div>
        <ButtonDetails
          startRecipe={ startRecipe }
          meal={ meal }
          drink={ drink }
          typeRecipes={ typeRecipes }
          id={ id }
        />
      </div>
    );
  }
}
