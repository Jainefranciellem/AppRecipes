import { screen, waitFor } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { renderWithRouter } from './helpers/renderWith';
import App from '../App';
import RecipesProvider from '../context/RecipesProvider';

const testDrinks = [
  { algo: 'Drinks', measure: ['1'] },
  { algo: 'Drinks', measure: ['1'] },
  { algo: 'Drinks', measure: ['1'] },
];
const testMeals = [
  { algo: 'Meals', measure: ['1'] },
  { algo: 'Meals', measure: ['1'] },
  { algo: 'Meals', measure: ['1'] },
  { algo: 'Meals', measure: ['1'] },
  { algo: 'Meals', measure: ['1'] },
  { algo: 'Meals', measure: ['1'] },
  { algo: 'Meals', measure: ['1'] },
  { algo: 'Meals', measure: ['1'] },
];

const saveLs = () => {
  localStorage.setItem('inProgressRecipes', JSON
    .stringify({ drinks: { 5050: testDrinks }, meals: { 5050: testMeals } }));
};

saveLs();

describe('All tests from Search', () => {
  it('It should navigate to the selected meal page when a meal category is clicked and a specific meal is selected from the list', async () => {
    renderWithRouter(
      <RecipesProvider>
        <App />
      </RecipesProvider>,
      { initialEntries: ['/meals/5050/in-progress'] },
    );

    await waitFor(() => {
      const ingredients = screen.getAllByText(/meals/i);
      expect(ingredients).toHaveLength(8);
      userEvent.click(ingredients[0]);
      // expect(ingredients[0]).toHaveClass('done-ingredient');
    });
    // const lsSaved = JSON.parse(localStorage
    //   .getItem('inProgressRecipes')) || [];
  });
});
