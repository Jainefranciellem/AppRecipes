import React, { useContext, useState } from 'react';
// import CopyToClipboard from 'react-copy-to-clipboar';
import { Link } from 'react-router-dom';
import clipboardCopy from 'clipboard-copy';
import shareIcon from '../images/shareIcon.svg';
import blackHeart from '../images/blackHeartIcon.svg';
import Header from '../components/Header';
import RecipesContext from '../context/RecipesContext';
import food from '../style/img/foods.svg';
import drink from '../style/img/drinks.svg';
import all from '../style/img/All (2).svg';

function FavoriteRecipes() {
  const favRecipes = JSON.parse(localStorage.getItem('favoriteRecipes')) || [];
  const [favoriteRecipes, setFavoriteRecipes] = useState(favRecipes);
  const { alert, setAlert } = useContext(RecipesContext);

  const filterFavorites = (filter) => {
    if (filter) {
      setFavoriteRecipes(favRecipes.filter((recipe) => recipe.type === filter));
    } else {
      setFavoriteRecipes(favRecipes);
    }
  };

  const removeFavorites = ({ target: { id } }) => {
    const favorite = favoriteRecipes.some((recipe) => recipe.id === id);
    if (favorite) {
      setFavoriteRecipes(favoriteRecipes.filter((recipe) => recipe.id !== id));
      localStorage.setItem('favoriteRecipes', JSON.stringify(
        favoriteRecipes.filter((recipe) => recipe.id !== id),
      ));
    }
  };

  const handleClick = (element) => {
    clipboardCopy(`http://localhost:3000${element}`);
    setAlert(true);
    const duration = 3000;
    setTimeout(() => {
      setAlert(false);
    }, duration);
  };
  return (
    <div>
      <Header />
      <div className="buttons">
        <button
          className="btn"
          type="button"
          data-testid="filter-by-all-btn"
          onClick={ () => filterFavorites('') }
        >
          <img src={ all } alt="" />
        </button>
        <button
          className="btn"
          type="button"
          data-testid="filter-by-meal-btn"
          onClick={ () => filterFavorites('meal') }
        >
          <img src={ food } alt="" />
        </button>
        <button
          className="btn"
          type="button"
          data-testid="filter-by-drink-btn"
          onClick={ () => filterFavorites('drink') }
        >
          <img src={ drink } alt="" />
        </button>
      </div>
      <section>
        {favoriteRecipes.map((recipe, index) => (
          <div className="card" key={ index }>
            <Link
              to={ recipe.type === 'meal'
                ? `/meals/${recipe.id}` : `/drinks/${recipe.id}` }
            >
              <img
                width="100"
                src={ recipe.image }
                alt={ recipe.name }
                data-testid={ `${index}-horizontal-image` }
              />
            </Link>
            <div className="h3AndShare">
              <h3 data-testid={ `${index}-horizontal-name` }>{recipe.name}</h3>
              <button
                src={ shareIcon }
                type="button"
                data-testid={ `${index}-horizontal-share-btn` }
                onClick={ () => handleClick(recipe.type === 'meal'
                  ? `/meals/${recipe.id}` : `/drinks/${recipe.id}`) }
              >
                <img className="cardImg" src={ shareIcon } alt="share-icon" />
              </button>
              <button
                className="buttonFavorite"
                alt="button-delete-favorite"
                data-testid={ `${index}-horizontal-favorite-btn` }
                src={ blackHeart }
                onClick={ removeFavorites }
              >
                <img src={ blackHeart } alt="" id={ recipe.id } />
              </button>
            </div>
            <p data-testid={ `${index}-horizontal-top-text` }>
              { recipe.type === 'meal'
                ? `${recipe.nationality} - ${recipe.category}` : recipe.alcoholicOrNot }
            </p>

          </div>))}
        { alert && <p>Link copied!</p> }
      </section>
    </div>
  );
}

export default FavoriteRecipes;
