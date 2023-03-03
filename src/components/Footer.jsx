import { useHistory } from 'react-router-dom';
import drinkIcon from '../images/drinkIcon.svg';
import mealIcon from '../images/mealIcon.svg';
import style from './Footer.module.css';

function Footer() {
  const history = useHistory();
  return (
    <footer className={ style.footer } data-testid="footer">
      <button
        data-testid="drinks-bottom-btn"
        src={ drinkIcon }
        onClick={ () => history.push('/drinks') }
      >
        <img src={ drinkIcon } alt="drink-icon" />
      </button>
      <button
        data-testid="meals-bottom-btn"
        src={ mealIcon }
        onClick={ () => history.push('/meals') }
      >
        <img src={ mealIcon } alt="meal-icon" />
      </button>
    </footer>
  );
}

export default Footer;
