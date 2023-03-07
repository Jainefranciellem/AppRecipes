import React, { useEffect, useState } from 'react';
import { useLocation } from 'react-router-dom';
import { fetchIdDrinks, fetchIdFood } from '../services/FetchApi';
import '../style/Details.css';

export default function RecipeDetails() {
  const [recomendation, setRecomendation] = useState(null);
  const [typeRecipe, setTypeRecipe] = useState(null);
  const [ingredient, setIngredient] = useState('');
  const [measure, setMeasure] = useState(null);
  const { pathname } = useLocation();
  const params = pathname.slice(1).split('/');
  const typeRecipes = params[0];
  const id = params[1];
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
    const fetchFoods = async () => {
      if (typeRecipes === 'meals') {
        const response = await fetch('https://www.thecocktaildb.com/api/json/v1/1/search.php?s=');
        const data = await response.json();
        const { drinks } = data;
        setRecomendation(drinks);
      } else {
        const response = await fetch('https://www.themealdb.com/api/json/v1/1/search.php?s=');
        const data = await response.json();
        const { meals } = data;
        setRecomendation(meals);
      }
    };
    fetchFoods();
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

  if (typeRecipe) {
    return (
      <div>
        <img
          data-testid="recipe-photo"
          width="300px"
          src={ typeRecipes === 'meals' ? typeRecipe[0].strMealThumb
            : typeRecipe[0].strDrinkThumb }
          alt=""
        />
        <h1
          data-testid="recipe-title"
        >
          { typeRecipes === 'meals' ? typeRecipe[0].strMeal : typeRecipe[0].strDrink }
        </h1>
        <h4
          data-testid="recipe-category"
        >
          { typeRecipes === 'meals' ? typeRecipe[0].strCategory
            : typeRecipe[0].strAlcoholic }
        </h4>
        { ingredient && ingredient?.map((ingredientRecipe, i) => (
          <div
            key={ i }
            data-testid={ `${i}-ingredient-name-and-measure` }
          >
            { `${ingredientRecipe}: ${measure[i]}` }
          </div>
        ))}
        <p data-testid="instructions">
          { typeRecipes === 'meals' ? typeRecipe[0].strInstructions
            : typeRecipe[0].strInstructions }
        </p>
        { typeRecipes === 'meals' && (
          <iframe
            data-testid="video"
            title="Video"
            frameBorder="0"
            src={ typeRecipe[0].strYoutube }
            allowFullScreen
          >
            Video
          </iframe>
        )}
        <div className="divRecomendation">
          {
            recomendation && (
              typeRecipes === 'drinks'
                ? recomendation?.slice(0, maxNumber).map((recipe, i) => (
                  <div
                    data-testid={ `${i}-recommendation-card` }
                    key={ `recipe.idMeal ${i}` }
                  >
                    <p data-testid={ `${i}-recommendation-title` }>{ recipe.strMeal }</p>
                  </div>
                ))
                : recomendation?.slice(0, maxNumber).map((recipe, i) => (
                  <div
                    data-testid={ `${i}-recommendation-card` }
                    key={ `recipe.idDrink ${i}` }
                  >
                    <p data-testid={ `${i}-recommendation-title` }>{recipe.strDrink}</p>
                  </div>
                ))
            )
          }
        </div>
        <button
          data-testid="start-recipe-btn"
          className="startBtn"
        >
          Start Recipe
        </button>
      </div>
    );
  }
}