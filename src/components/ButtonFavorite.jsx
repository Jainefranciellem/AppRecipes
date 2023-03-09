import PropTypes, { shape } from 'prop-types';
import React, { useEffect, useState } from 'react';
import whiteHeart from '../images/whiteHeartIcon.svg';
import blackHeart from '../images/blackHeartIcon.svg';
import '../style/RecipesDetails.css';

export default function ButtonFavorite({ typeRecipe, typeRecipes, id }) {
  const [icon, setIcon] = useState(whiteHeart);
  const getLocalStorage = JSON.parse(localStorage.getItem('favoriteRecipes')) ?? [];
  const [favorite, setFavorite] = useState(getLocalStorage);
  const obj = {
    id,
    type: typeRecipes === 'meals' ? 'meal' : 'drink',
    nationality: typeRecipe[0].strArea || '',
    category: typeRecipe[0].strCategory || '',
    alcoholicOrNot: typeRecipe[0].strAlcoholic || '',
    name: typeRecipes === 'meals' ? typeRecipe[0].strMeal : typeRecipe[0].strDrink,
    image: typeRecipes === 'meals' ? typeRecipe[0].strMealThumb
      : typeRecipe[0].strDrinkThumb,
  };
  const handleClick = () => {
    const favoriteRecipes = favorite.some((recipe) => recipe.id === id);
    if (favoriteRecipes) {
      setFavorite(favorite.filter((recipe) => recipe.id !== id));
    } else {
      const newFavorites = [...favorite, obj];
      setFavorite(newFavorites);
      localStorage.setItem('favoriteRecipes', JSON.stringify(newFavorites));
    }
  };
  useEffect(() => {
    const favoriteRecipes = favorite.some((recipe) => recipe.id === id);
    setIcon(favoriteRecipes ? blackHeart : whiteHeart);
  }, [favorite]);

  return (
    <button
      className="buttonFavorite"
      data-testid="favorite-btn"
      src={ icon }
      onClick={ handleClick }
    >
      <img src={ icon } alt="" />
    </button>
  );
}

ButtonFavorite.propTypes = {
  id: PropTypes.string.isRequired,
  typeRecipe: PropTypes.arrayOf(shape({})).isRequired,
  typeRecipes: PropTypes.string.isRequired,
};
