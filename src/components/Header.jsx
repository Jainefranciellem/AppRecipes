import React, { useContext, useEffect, useState } from 'react';
import { useHistory, useLocation } from 'react-router-dom';
import RecipesContext from '../context/RecipesContext';
import profileIcon from '../style/img/icone-perfil.svg';
import searchIcon from '../style/img/Vector.svg';
import SearchBar from './SearchBar';
import '../style/Header.css';
import logo from '../style/img/Group 4.svg';
import iconDish from '../style/img/icone-prato.svg';

function Header() {
  const location = useLocation();
  const history = useHistory();
  const [title, setTitle] = useState(''); // title of the page
  const [loadSearch, setLoadSearch] = useState(true); // responsible for controlling the rendering of the search icon
  const [hiddenSearchBtn, setHiddenSearchBtn] = useState(false);
  const { setStateApi } = useContext(RecipesContext);

  /**
   * responsible for capturing the patch and treating it to use as the title of the page
   */
  const pageName = () => {
    const local = location.pathname.replace('/', '');
    const titlePage = local[0].toUpperCase() + local.substring(1);
    setTitle(titlePage);
  };

  /**
   * based on location.pathname saves in state true or false
   * @returns {boolean} responsible for controlling the rendering of the search icon
   */
  const controlsSearchRendering = () => {
    switch (location.pathname) {
    case '/profile':
      return setLoadSearch(false);
    case '/done-recipes':
      return setLoadSearch(false);
    case '/favorite-recipes':
      return setLoadSearch(false);
    case '/meals':
      return setStateApi('food');
    case '/drinks':
      return setStateApi('drinks');
    default:
      setLoadSearch(true);
    }
  };

  useEffect(() => {
    pageName();
    controlsSearchRendering();
  }, []);

  // Route change by clicking profile button
  const handleClick = () => {
    history.push('/profile');
  };

  return (
    <>
      <div className="header">
        <img className="logoHeader" src={ logo } alt="logo" />
        <p className="p">
          RECIPES
          {' '}
          <span>app</span>
          {' '}
        </p>
        <div className="buttons">
          <button
            className="buttonHeader"
            type="button"
            onClick={ () => setHiddenSearchBtn(!hiddenSearchBtn) }
          >
            {loadSearch && (
              <img
                src={ searchIcon }
                alt="search-icon"
                data-testid="search-top-btn"
              />)}
          </button>
          <button
            type="button"
            onClick={ handleClick }
            className="buttonHeader"
          >
            <img
              src={ profileIcon }
              alt="profile-icon"
              data-testid="profile-top-btn"
            />
          </button>
        </div>
      </div>
      <div className="containerHeader">
        <img src={ iconDish } className="iconDish" alt="" />
        <h1
          className="mealsTitle"
          data-testid="page-title"
        >
          { title }
        </h1>
        {hiddenSearchBtn && (
          <SearchBar />)}
      </div>
    </>
  );
}

export default Header;
