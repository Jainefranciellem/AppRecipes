import { useState } from 'react';
import Header from '../components/Header';
import RecipesCard from '../components/RecipesCard';
import food from '../style/img/foods.svg';
import drink from '../style/img/drinks.svg';
import all from '../style/img/All (2).svg';
import '../style/DoneRecipes.css';

function DoneRecipes() {
  const recipes = JSON.parse(localStorage.getItem('doneRecipes'));
  const [filteredRecipes, setFilteredRecipes] = useState(recipes);

  function applyFilter(filter) {
    if (filter) {
      setFilteredRecipes(recipes.filter((recipe) => recipe.type === filter));
    } else {
      setFilteredRecipes(recipes);
    }
  }
  return (
    <div>
      <Header />
      <div className="buttons">
        <button
          className="btn"
          type="button"
          data-testid="filter-by-all-btn"
          onClick={ () => applyFilter('') }
        >
          <img src={ all } alt="" />
        </button>
        <button
          type="button"
          className="btn"
          data-testid="filter-by-meal-btn"
          onClick={ () => applyFilter('meal') }
        >
          <img src={ food } alt="" />
        </button>
        <button
          type="button"
          className="btn"
          data-testid="filter-by-drink-btn"
          onClick={ () => applyFilter('drink') }
        >
          <img src={ drink } alt="" />
        </button>
      </div>
      {filteredRecipes.map((recipe, index) => (
        <div key={ index }>
          <RecipesCard recipe={ recipe } index={ index } />
        </div>
      ))}
    </div>
  );
}

export default DoneRecipes;
