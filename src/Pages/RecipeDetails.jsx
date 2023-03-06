import React, { useEffect, useState } from 'react';
import { useLocation } from 'react-router-dom';
import { fetchIdDrinks, fetchIdFood } from '../services/FetchApi';

export default function RecipeDetails() {
  const [typeRecipe, setTypeRecipe] = useState(null);
  const [ingredient, setIngredient] = useState('');
  const [measure, setMeasure] = useState(null);
  const { pathname } = useLocation();
  const params = pathname.slice(1).split('/');
  const typeRecipes = params[0];
  const id = params[1];
  console.log(typeRecipe);
  console.log(typeRecipes);

  useEffect(() => {
    const fetchById = async () => {
      const recipeFood = await fetchIdFood(id);
      const { meals } = recipeFood;
      setTypeRecipe(meals);
      const recipeDrink = await fetchIdDrinks(id);
      if (typeRecipes === 'drinks') {
        const { drinks } = recipeDrink;
        setTypeRecipe(drinks);
      }
    };
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
            : typeRecipe[0].strCategory }
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
        {/* <iframe
          data-testid="video"
          title="Video"
          frameBorder="0"
          src={ typeRecipes === 'meals' && typeRecipe[0].strYoutube }
          allowFullScreen
        >
          Video
        </iframe> */}
      </div>
    );
  }
}
