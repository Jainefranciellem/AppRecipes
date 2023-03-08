import { screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { renderWithRouter } from './helpers/renderWith';
import App from '../App';
import RecipesProvider from '../context/RecipesProvider';
// import fetchMock from '../../cypress/mocks/fetch';

describe('Testando a tela de Profile', () => {
  test('Testa rota done-recipes', () => {
    const { history } = renderWithRouter(
      <RecipesProvider>
        <App />
      </RecipesProvider>,
    );
    const email = screen.getByPlaceholderText('email');
    const password = screen.getByPlaceholderText('password');
    const button = screen.getByRole('button', { name: /Enter/i });
    userEvent.type(email, 'teste1@teste.com');
    userEvent.type(password, '1234567');
    userEvent.click(button);
    const buttonProfile = screen.getByAltText('profile-icon');
    userEvent.click(buttonProfile);
    const buttonDone = screen.getByRole('button', { name: /Done Recipes/i });
    userEvent.click(buttonDone);
    const { pathname } = history.location;
    expect(pathname).toBe('/done-recipes');
  });
  test('Testa rota favorite-recipes', () => {
    const { history } = renderWithRouter(
      <RecipesProvider>
        <App />
      </RecipesProvider>,
    );
    const email = screen.getByPlaceholderText('email');
    const password = screen.getByPlaceholderText('password');
    const button = screen.getByRole('button', { name: /Enter/i });
    userEvent.type(email, 'teste@teste.com');
    userEvent.type(password, '1234567');
    userEvent.click(button);
    const buttonProfile = screen.getByTestId('profile-top-btn');
    userEvent.click(buttonProfile);
    const buttonDone = screen.getByRole('button', { name: /Favorite Recipes/i });
    userEvent.click(buttonDone);
    const { pathname } = history.location;
    expect(pathname).toBe('/favorite-recipes');
  });
  test('Testa se o botão Logout vai para a rota /', () => {
    const { history } = renderWithRouter(
      <RecipesProvider>
        <App />
      </RecipesProvider>,
    );
    const email = screen.getByPlaceholderText('email');
    const password = screen.getByPlaceholderText('password');
    const button = screen.getByRole('button', { name: /Enter/i });
    userEvent.type(email, 'teste@teste.com');
    userEvent.type(password, '1234567');
    userEvent.click(button);
    const buttonProfile = screen.getByTestId('profile-top-btn');
    userEvent.click(buttonProfile);
    const buttonDone = screen.getByRole('button', { name: /Logout/i });
    userEvent.click(buttonDone);
    const { pathname } = history.location;
    expect(pathname).toBe('/');
  });
});
