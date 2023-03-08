import PropTypes from 'prop-types';
import React from 'react';
import '../style/RecipesDetails.css';

export default function ButtonFavorite({ typeRecipe, typeRecipes, id }) {
  const handleClick = () => {
    const array = [{
      id,
      type: typeRecipes === 'meals' ? 'meal' : 'drink',
      nationality: typeRecipe[0].strArea || '',
      category: typeRecipe[0].strCategory || '',
      alcoholicOrNot: typeRecipe[0].strAlcoholic || '',
      name: typeRecipes === 'meals' ? typeRecipe[0].strMeal : typeRecipe[0].strDrink,
      image: typeRecipes === 'meals' ? typeRecipe[0].strMealThumb
        : typeRecipe[0].strDrinkThumb,
    }];
    localStorage.setItem('favoriteRecipes', JSON.stringify(array));
  };
  return (
    <button
      className="buttonFavorite"
      data-testid="favorite-btn"
      onClick={ handleClick }
    >
      Favorite
    </button>
  );
}

ButtonFavorite.propTypes = {
  id: PropTypes.string.isRequired,
  typeRecipe: PropTypes.shape([]).isRequired,
  typeRecipes: PropTypes.string.isRequired,
};
