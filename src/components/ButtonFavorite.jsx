import React from 'react';
import '../style/RecipesDetails.css';

export default function BurronFavorite() {
  return (
    <button
      className="buttonFavorite"
      data-testid="favorite-btn"
    >
      Favorite
    </button>
  );
}
