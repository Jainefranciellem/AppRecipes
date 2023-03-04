import { screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { renderWithRouter } from './helpers/renderWith';
import App from '../App';
import RecipesProvider from '../context/RecipesProvider';

test('Testa interação dos elementos no componente SearchBar na url /meals', () => {
  beforeEach(() => {
    jest.spyOn(global, 'fetch').mockResolvedValue({
      json: jest.fn().mockResolvedValue('test'),
    });
  });
  renderWithRouter(
    <RecipesProvider>
      <App />
    </RecipesProvider>,
  );
  const email = screen.getByTestId('email-input');
  const password = screen.getByTestId('password-input');
  const submit = screen.getByTestId('login-submit-btn');
  userEvent.type(email, 'email@mail.com');
  userEvent.type(password, '1234567');
  userEvent.click(submit);

  const profile = screen.getByTestId('search-top-btn');
  userEvent.click(profile);
  const searchInput = screen.getByTestId('search-input');
  const radios = screen.getAllByRole('radio');
  const searchBtn = screen.getByTestId('exec-search-btn');
  userEvent.type(searchInput, 'egg');
  userEvent.click(radios[0]);
  userEvent.click(radios[1]);
  userEvent.click(radios[2]);
  userEvent.click(searchBtn);
  userEvent.type(searchInput, 'a');
  userEvent.click(radios[2]);
  userEvent.click(searchBtn);
});
