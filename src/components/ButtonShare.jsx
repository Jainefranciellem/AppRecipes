import PropTypes from 'prop-types';
import React, { useContext } from 'react';
import clipboardCopy from 'clipboard-copy';
import RecipesContext from '../context/RecipesContext';
import '../style/RecipesDetails.css';
import share from '../style/img/Share.svg';

export default function ButtonShare({ pathname }) {
  const { setAlert } = useContext(RecipesContext);
  const URL = `http://localhost:3000${pathname}`;

  const handleClick = () => {
    clipboardCopy(URL);
    setAlert(true);
    const duration = 3000;
    setTimeout(() => {
      setAlert(false);
    }, duration);
  };
  return (
    <button
      className="buttonShare"
      data-testid="share-btn"
      onClick={ handleClick }
    >
      <img src={ share } alt="" />
    </button>
  );
}

ButtonShare.propTypes = {
  pathname: PropTypes.string.isRequired,
};
