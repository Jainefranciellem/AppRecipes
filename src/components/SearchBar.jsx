import React, { useState } from 'react';
import { fetchApiFirstLetter,
  fetchApiIngredients, fetchApiName } from '../services/FetchApi';

// Created componet Search Bar
export default function SearchBar() {
  const [filters, setFilters] = useState('');
  const [resultApi, setResultApi] = useState(false);

  const handleClick = async () => {
    if (resultApi === 'ingredient') {
      await fetchApiIngredients(filters);
    }
    if (resultApi === 'name') {
      await fetchApiName(filters);
    }
    if (resultApi === 'firstLetter') {
      const request = await fetchApiFirstLetter(filters);
      console.log(request);
    }
  };

  return (
    <section className="searchBar">
      <div>
        <input
          data-testid="search-input"
          type="text"
          value={ filters }
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
              // checked={ setResultApi(true) }
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
              // checked={ setResultApi(true) }
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
              // checked={ setResultApi(true) }
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
          onClick={ handleClick }
        >
          Search
        </button>
      </div>
    </section>
  );
}
