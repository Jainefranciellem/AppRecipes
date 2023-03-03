import drinkIcon from '../images/drinkIcon.svg';
import mealIcon from '../images/mealIcon.svg';
import style from './Footer.module.css';

function Footer() {
  return (
    <footer className={ style.footer } data-testid="footer">
      <button data-testid="drinks-bottom-btn" src={ drinkIcon }>
        <img src={ drinkIcon } alt="drink-icon" />
      </button>
      <button data-testid="meals-bottom-btn" src={ mealIcon }>
        <img src={ mealIcon } alt="meal-icon" />
      </button>
    </footer>
  );
}

export default Footer;
