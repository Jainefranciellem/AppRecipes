import { screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { renderWithRouter } from './helpers/renderWith';
import App from '../App';
import RecipesProvider from '../context/RecipesProvider';

test('Test footer', () => {
  const { history } = renderWithRouter(
    <RecipesProvider>
      <App />
    </RecipesProvider>,
    { initialEntries: ['/meals'] },
  );
  const buttonDrinks = screen.getByTestId('drinks-bottom-btn');
  userEvent.click(buttonDrinks);
  expect(history.location.pathname).toBe('/drinks');

  const buttonMeals = screen.getByTestId('meals-bottom-btn');
  userEvent.click(buttonMeals);
  expect(history.location.pathname).toBe('/meals');
});
