import { useContext } from 'react';
import { useHistory } from 'react-router-dom';
import RecipesContext from '../context/RecipesContext';
import drinkIcon from '../images/drinkIcon.svg';
import mealIcon from '../images/mealIcon.svg';
import style from './Footer.module.css';

function Footer() {
  const history = useHistory();
  const { setStateApi, setRecipesFiltered } = useContext(RecipesContext);

  const handleDrink = () => {
    history.push('/drinks');
    setStateApi('drinks');
    setRecipesFiltered([]);
  };
  const handleFood = () => {
    history.push('/meals');
    setStateApi('food');
    setRecipesFiltered([]);
  };

  return (
    <footer className={ style.footer } data-testid="footer">
      <button
        data-testid="drinks-bottom-btn"
        src={ drinkIcon }
        onClick={ handleDrink }
      >
        <img src={ drinkIcon } alt="drink-icon" />
      </button>
      <button
        data-testid="meals-bottom-btn"
        src={ mealIcon }
        onClick={ handleFood }
      >
        <img src={ mealIcon } alt="meal-icon" />
      </button>
    </footer>
  );
}

export default Footer;
