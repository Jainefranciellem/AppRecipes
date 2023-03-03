import React from 'react';

export default function SearchBar() {
  // Created componet Search Bar
  return (
    <section>
      <div>
        <input
          data-testid="search-input"
          type="text"
          placeholder="Buscar Receita"
          className="search-input"
        />
        <div className="radioFilters">
          <div>
            <input
              type="radio"
              id="Ingredient"
              name="radioFilter"
              value="Ingredient"
              data-testid="ingredient-search-radio"
              className="search-radio"
            />
            <label htmlFor="Ingredient">
              Ingredient
            </label>
          </div>
          <div>
            <input
              type="radio"
              id="Name"
              name="radioFilter"
              value="Name"
              data-testid="name-search-radio"
              className="search-radio"
            />
            <label htmlFor="Name">
              Name
            </label>
          </div>
          <div>
            <input
              type="radio"
              id="firstLetter"
              name="radioFilter"
              value="firstLetter"
              data-testid="first-letter-search-radio"
              className="search-radio"
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
          onClick={ () => {} }
        >
          Search
        </button>
      </div>
    </section>
  );
}
