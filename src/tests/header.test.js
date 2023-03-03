import { screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { renderWithRouter } from '../context/helpers/renderWith';
import App from '../App';
import RecipesProvider from '../context/RecipesProvider';

// More than 45% of header tests

describe('testando Header', () => {
  it('testa se o Header é renderizado corretamente', () => {
    renderWithRouter(
      <RecipesProvider>
        <App />
      </RecipesProvider>,
      { initialEntries: ['/Meals'] },
    );
  });
  it('testa se os elementos do Header estão na tela', () => {
    renderWithRouter(
      <RecipesProvider>
        <App />
      </RecipesProvider>,
      { initialEntries: ['/Meals'] },
    );
    const search = screen.getByRole('button', { name: /search-icon/i });
    const profile = screen.getByRole('button', { name: /profile-icon/i });
    const title = screen.getByRole('heading', { name: /meals/i });
    expect(profile).toBeInTheDocument();
    expect(search).toBeInTheDocument();
    expect(title).toBeInTheDocument();
  });

  test('Testa mudança de rota no Header para o profile', () => {
    const { history } = renderWithRouter(
      <RecipesProvider>
        <App />
      </RecipesProvider>,
      { initialEntries: ['/Meals'] },
    );
    const profile = screen.getByRole('button', { name: /profile-icon/i });
    userEvent.click(profile);

    screen.getByRole('heading', { name: /profile/i });
    expect(history.location.pathname).toBe('/profile');
  });
});
