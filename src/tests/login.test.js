import { screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { renderWithRouter } from './helpers/renderWith';
import App from '../App';
import RecipesProvider from '../context/RecipesProvider';

describe('Testando a tela de Login', () => {
  test('Verifica se a tela Login é renderizada corretamente', () => {
    renderWithRouter(
      <RecipesProvider>
        <App />
      </RecipesProvider>,
    );
  });

  test('Verifica se é renderizado os campos de email e senha na tela', () => {
    renderWithRouter(
      <RecipesProvider>
        <App />
      </RecipesProvider>,
    );
    const email = screen.getByPlaceholderText('email');
    const password = screen.getByPlaceholderText('password');
    expect(email).toBeInTheDocument();
    expect(password).toBeInTheDocument();
  });

  test('Verifica se existe um button com o texto Entrar', () => {
    renderWithRouter(
      <RecipesProvider>
        <App />
      </RecipesProvider>,
    );
    const button = screen.getByRole('button', { name: /Enter/i });
    expect(button).toBeInTheDocument();
  });

  test('Verifica se o button é habilitado caso email e password estejam corretos', () => {
    renderWithRouter(
      <RecipesProvider>
        <App />
      </RecipesProvider>,
    );
    const email = screen.getByPlaceholderText('email');
    const password = screen.getByPlaceholderText('password');
    const button = screen.getByRole('button', { name: /Enter/i });
    userEvent.type(email, 'teste@teste.com');
    userEvent.type(password, '1234567');
    expect(button).toBeEnabled();
  });

  test('Verifica se o button é desabilitado caso email e password estejam incorretos', () => {
    renderWithRouter(
      <RecipesProvider>
        <App />
      </RecipesProvider>,
    );
    const email = screen.getByTestId('email-input');
    const password = screen.getByTestId('password-input');
    const button = screen.getByRole('button', { name: /Enter/i });
    userEvent.type(email, 'testste.com');
    userEvent.type(password, '1234');
    expect(button).toBeDisabled();
  });

  test('Verifica se ao clicar np botão é redirecionado para a home', () => {
    const { history } = renderWithRouter(
      <RecipesProvider>
        <App />
      </RecipesProvider>,
    );
    const email = screen.getByTestId('email-input');
    const password = screen.getByTestId('password-input');
    userEvent.type(email, 'teste@teste.com');
    userEvent.type(password, '1234567');
    const button = screen.getByRole('button', { name: /Enter/i });
    userEvent.click(button);
    const { pathname } = history.location;
    expect(pathname).toBe('/meals');
  });
});
