import React, { useEffect, useState } from 'react';
import { useLocation } from 'react-router-dom';

const limits = 5;

function Recipes() {
  const location = useLocation();
  const [category, setCategory] = useState([]);
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

  return (
    <div>
      { category[location.pathname.replace('/', '')]?.filter((el, idx) => idx <= limits)
        .map((element) => (
          <button
            type="button"
            key={ element.strCategory }
            data-testid={ `${element.strCategory}-category-filter` }
          >
            { element.strCategory }
          </button>
        )) }

    </div>
  );
}

export default Recipes;
