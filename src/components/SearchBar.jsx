import React, { useContext, useState } from 'react';
import RecipesContext from '../context/RecipesContext';
import { fetchDrinksFirstLetter, fetchDrinksIngredients,
  fetchDrinksName, fetchFoodFirstLetter,
  fetchFoodIngredients, fetchFoodName } from '../services/FetchApi';

// Created componet Search Bar
export default function SearchBar() {
  const [filters, setFilters] = useState('');
  const [resultApi, setResultApi] = useState('');
  const { stateApi } = useContext(RecipesContext);

  const handleFood = async () => {
    if (resultApi === 'ingredient') {
      await fetchFoodIngredients(filters);
    }
    if (resultApi === 'name') {
      await fetchFoodName(filters);
    }
    if (resultApi === 'firstLetter') {
      const request = await fetchFoodFirstLetter(filters);
      console.log(request);
    }
  };

  const handleDrinks = async () => {
    if (resultApi === 'ingredient') {
      await fetchDrinksIngredients(filters);
    }
    if (resultApi === 'name') {
      const request = await fetchDrinksName(filters);
      console.log(request);
    }
    if (resultApi === 'firstLetter') {
      await fetchDrinksFirstLetter(filters);
    }
  };

  return (
    <section className="searchBar">
      <div>
        <input
          data-testid="search-input"
          type="text"
          value={ filters.filter }
          placeholder="Buscar Receita"
          className="search-input"
          onChange={ ({ target }) => setFilters(target.value) }
        />
        <div className="radioFilters">
          <div>
            <input
              type="radio"
              name="radioFilter"
              value="ingredient"
              data-testid="ingredient-search-radio"
              className="search-radio"
              onChange={ ({ target }) => setResultApi(target.value) }
            />
            <label htmlFor="Ingredient">
              Ingredient
            </label>
          </div>
          <div>
            <input
              type="radio"
              name="radioFilter"
              value="name"
              data-testid="name-search-radio"
              className="search-radio"
              onChange={ ({ target }) => setResultApi(target.value) }
            />
            <label htmlFor="Name">
              Name
            </label>
          </div>
          <div>
            <input
              type="radio"
              name="radioFilter"
              value="firstLetter"
              data-testid="first-letter-search-radio"
              className="search-radio"
              onChange={ ({ target }) => setResultApi(target.value) }
            />
            <label htmlFor="firstLetter">
              First letter
            </label>
          </div>
        </div>
        <button
          type="button"
          data-testid="exec-search-btn"
          className="search-button"
          onClick={ stateApi === 'food' ? handleFood : handleDrinks }
        >
          Search
        </button>
      </div>
    </section>
  );
}
