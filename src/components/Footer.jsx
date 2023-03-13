import { useContext } from 'react';
import { useHistory } from 'react-router-dom';
import RecipesContext from '../context/RecipesContext';
import iconeBebida from '../style/img/icone-bebida.svg';
import iconePrato from '../style/img/icone-prato.svg';
import '../style/Footer.css';

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
    <footer className="footer" data-testid="footer">
      <button
        className="buttonDrink"
        data-testid="drinks-bottom-btn"
        src={ iconeBebida }
        onClick={ handleDrink }
      >
        <img src={ iconeBebida } alt="drink-icon" />
      </button>
      <button
        className="buttonMeal"
        data-testid="meals-bottom-btn"
        src={ iconePrato }
        onClick={ handleFood }
      >
        <img className="imgFooter" src={ iconePrato } alt="meal-icon" />
      </button>
    </footer>
  );
}

export default Footer;
