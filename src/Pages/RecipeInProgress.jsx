import React from 'react';

function RecipeInProgress() {
  return (
    <div>
      <h1 data-testid="recipe-title">Nome da Receita</h1>
      <img
        src=""
        alt=""
        data-testid="recipe-photo"
      />
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
