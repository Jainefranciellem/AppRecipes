import React, { useEffect, useState } from 'react';
import { useLocation } from 'react-router-dom';
import profileIcon from '../images/profileIcon.svg';
import searchIcon from '../images/searchIcon.svg';

function Header() {
  const location = useLocation();
  const [title, setTitle] = useState(''); // title of the page
  const [loadSearch, setLoadSearch] = useState(true); // responsible for controlling the rendering of the search icon

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
    default:
      setLoadSearch(true);
    }
  };

  useEffect(() => {
    pageName();
    controlsSearchRendering();
  }, []);

  return (
    <div>
      {loadSearch && (
        <img
          src={ searchIcon }
          alt="search-icon"
          data-testid="search-top-btn"
        />)}
      <img
        src={ profileIcon }
        alt="profile-icon"
        data-testid="profile-top-btn"
      />
      <h1
        data-testid="page-title"
      >
        { title }
      </h1>
    </div>
  );
}

export default Header;
