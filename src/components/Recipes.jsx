import React, { useContext, useEffect, useState } from 'react';
import { useLocation } from 'react-router-dom';
import RecipesContext from '../context/RecipesContext';
import Dish from '../style/img/All.svg';
import Dessert from '../style/img/dessert.svg';
import Beef from '../style/img/beef.svg';
import Chicken from '../style/img/chicken.svg';
import Breakfast from '../style/img/breakfast.svg';
import Goat from '../style/img/goat.svg';
import '../style/Recipes.css';

const limits = 5;

function Recipes() {
  const { recipesFiltered, setRecipesFiltered } = useContext(RecipesContext);

  const location = useLocation();
  const [category, setCategory] = useState([]);
  const [arrayImg] = useState([Dessert, Beef, Chicken, Breakfast, Goat]);

  const categoryMeals = async () => {
    const response = await fetch('https://www.themealdb.com/api/json/v1/1/list.php?c=list');
    const data = await response.json();
    setCategory(data);
  };

  const categoryDrinks = async () => {
    const response = await fetch('https://www.thecocktaildb.com/api/json/v1/1/list.php?c=list');
    const data = await response.json();
    setCategory(data);
  };

  const selectCategory = () => {
    if (location.pathname === '/meals') return categoryMeals();
    return categoryDrinks();
  };

  useEffect(() => {
    selectCategory();
  }, []);

  const applyFilterMeals = async (name) => {
    const response = await fetch(`https://www.themealdb.com/api/json/v1/1/filter.php?c=${name}`);
    const data = await response.json();
    if (recipesFiltered.length > 0) return setRecipesFiltered([]);
    setRecipesFiltered(data.meals);
  };

  const applyFilterDrinks = async (name) => {
    const response = await fetch(`https://www.thecocktaildb.com/api/json/v1/1/filter.php?c=${name}`);
    const data = await response.json();
    if (recipesFiltered.length > 0) return setRecipesFiltered([]);
    setRecipesFiltered(data.drinks);
  };

  const filterSelect = (name) => {
    if (location.pathname === '/meals') return applyFilterMeals(name);
    return applyFilterDrinks(name);
  };

  return (
    <div className="buttonsFilters">
      <button
        className="allBtn"
        data-testid="All-category-filter"
        onClick={ () => setRecipesFiltered([]) }
      >
        <img src={ Dish } className="Dish" alt="" />
      </button>
      { category[location.pathname.replace('/', '')]?.filter((_el, idx) => idx < limits)
        .map((element, i) => (
          <button
            className="filtersBtn"
            type="button"
            key={ element.strCategory }
            data-testid={ `${element.strCategory}-category-filter` }
            onClick={ () => filterSelect(element.strCategory) }
          >
            <img className="imgFilters" src={ arrayImg[i] } alt="" />
          </button>
        )) }

    </div>
  );
}

export default Recipes;
