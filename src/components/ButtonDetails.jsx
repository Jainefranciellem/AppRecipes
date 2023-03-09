import PropTypes from 'prop-types';
import React from 'react';

export default function ButtonDetails({ startRecipe, meal, drink, typeRecipes, id }) {
  return (
    <div>
      {
        !Object.keys(typeRecipes === 'meals' ? meal : drink).includes(id) ? (
          <button
            className="startBtn"
            data-testid="start-recipe-btn"
            onClick={ startRecipe }
          >
            Start Recipe
          </button>)
          : (
            <button
              className="startBtn"
              data-testid="start-recipe-btn"
            >
              Continue Recipe
            </button>)
      }
    </div>
  );
}

ButtonDetails.propTypes = {
  drink: PropTypes.shape({}).isRequired,
  id: PropTypes.string.isRequired,
  meal: PropTypes.shape({}).isRequired,
  startRecipe: PropTypes.func.isRequired,
  typeRecipes: PropTypes.string.isRequired,
};
