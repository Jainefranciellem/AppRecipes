import { screen, render } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import App from '../App';
import RecipesProvider from '../context/RecipesProvider';

describe('Testando a tela de Login', () => {
  test('Verifica se a tela Login é renderizada corretamente', () => {
    render(
      <RecipesProvider>
        <App />
      </RecipesProvider>,
    );
  });

  test('Verifica se é renderizado os campos de email e senha na tela', () => {
    render(
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
    render(
      <RecipesProvider>
        <App />
      </RecipesProvider>,
    );
    const button = screen.getByRole('button', { name: /Enter/i });
    expect(button).toBeInTheDocument();
  });

  test('Verifica se o button é habilitado caso email e password estejam corretos', () => {
    render(
      <RecipesProvider>
        <App />
      </RecipesProvider>,
    );
    const email = screen.getByTestId('email-input');
    const password = screen.getByTestId('password-input');
    const button = screen.getByRole('button', { name: /Enter/i });
    userEvent.type(email, 'teste@teste.com');
    userEvent.type(password, '123456');
    expect(button).toBeEnabled();
  });

  test('Verifica se o button é desabilitado caso email e password estejam incorretos', () => {
    render(
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
});
