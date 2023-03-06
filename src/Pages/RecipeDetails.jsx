import React, { useEffect } from 'react';
import { useLocation } from 'react-router-dom';
import { fetchIdDrinks, fetchIdFood } from '../services/FetchApi';

export default function RecipeDetails() {
  const { pathname } = useLocation();
  const params = pathname.slice(1).split('/');
  console.log(params);
  const id = params[1];
  console.log(id);

  useEffect(() => {
    const fetchById = async () => {
      await fetchIdFood(id);
      await fetchIdDrinks(id);
    };
    fetchById();
  }, [id]);
  return (
    <div>RecipeDetails</div>
  );
}
