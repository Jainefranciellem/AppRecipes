import { number, arrayOf, string, shape } from 'prop-types';
import CopyToClipboard from 'react-copy-to-clipboard';
import { Link } from 'react-router-dom';
import Swal from 'sweetalert2';
import share from '../style/img/Share.svg';
import '../style/DoneRecipes.css';

function RecipesCard({ recipe, index }) {
  return (
    <section>
      <div>
        <div className="card" key={ index }>
          <Link
            to={ recipe.type === 'meal' ? `/meals/${recipe.id}` : `/drinks/${recipe.id}` }
          >
            <img
              className="cardImg"
              width="100"
              src={ recipe.image }
              alt={ recipe.name }
              data-testid={ `${index}-horizontal-image` }
            />
          </Link>
          <div>
            <div className="h3AndShare">
              <h3 data-testid={ `${index}-horizontal-name` }>{recipe.name}</h3>
              <CopyToClipboard
                text={ `/meals/${recipe.id}` }
                onCopy={ () => {
                  navigator.clipboard.writeText(`http://localhost:3000/meals/${recipe.id}`);
                  Swal.fire({
                    position: 'center',
                    width: 300,
                    icon: 'success',
                    title: 'Link copied!',
                    showConfirmButton: false,
                    timer: 1000,
                  });
                } }
              >
                <button
                  src={ share }
                  className="share"
                  type="button"
                  data-testid={ `${index}-horizontal-share-btn` }
                >
                  <img src={ share } alt="share-icon" />
                </button>
              </CopyToClipboard>
            </div>
            <p className="p-category" data-testid={ `${index}-horizontal-top-text` }>
              { recipe.type === 'meal'
                ? `${recipe.nationality} - ${recipe.category}` : recipe.alcoholicOrNot }
            </p>

            <p
              className="date-card"
              data-testid={ `${index}-horizontal-done-date` }
            >
              Done in: {recipe.doneDate}
            </p>
          </div>
        </div>
      </div>
    </section>
  );
}

RecipesCard.propTypes = {
  recipes: arrayOf(
    shape({
      id: number,
      name: string,
      image: string,
      category: string,
      doneDate: string,
      type: string,
      tags: arrayOf(string),
    }),
  ),
}.isRequired;

export default RecipesCard;
