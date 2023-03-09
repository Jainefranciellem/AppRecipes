import React, { useContext, useEffect, useState } from 'react';
import { useHistory, useLocation } from 'react-router-dom';
import RecipesContext from '../context/RecipesContext';
import profileIcon from '../images/profileIcon.svg';
import searchIcon from '../images/searchIcon.svg';
import SearchBar from './SearchBar';
import '../style/Header.css';
import logo from '../style/img/Group 4.svg';

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
        {hiddenSearchBtn && (
          <SearchBar />)}
        <div className="buttons">
          <button
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
          >
            <img
              src={ profileIcon }
              alt="profile-icon"
              data-testid="profile-top-btn"
            />
          </button>
        </div>
      </div>
      <h1
        data-testid="page-title"
      >
        { title }
      </h1>
    </>
  );
}

export default Header;
