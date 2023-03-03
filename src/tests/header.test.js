import { screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { renderWithRouter } from './helpers/renderWith';
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

  test('Testa a funcionalidade hidden do search button', () => {
    renderWithRouter(
      <RecipesProvider>
        <App />
      </RecipesProvider>,
      { initialEntries: ['/Meals'] },
    );
    const btn = screen.getByTestId('search-top-btn');
    // const inputSearch = screen.queryByTestId('search-input');

    expect(screen.queryByRole('textbox')).not.toBeInTheDocument();

    userEvent.click(btn);

    console.log(screen.queryByTestId('search-input'));
    expect(screen.queryByTestId('search-input')).toBeInTheDocument();
  });

  test('Test if you go to the "/done-recipes" route', () => {
    const { history } = renderWithRouter(
      <RecipesProvider>
        <App />
      </RecipesProvider>,
      { initialEntries: ['/done-recipes'] },
    );

    expect(history.location.pathname).toBe('/done-recipes');
  });

  test('Test if you go to the "/favorite-recipes" route', () => {
    const { history } = renderWithRouter(
      <RecipesProvider>
        <App />
      </RecipesProvider>,
      { initialEntries: ['/favorite-recipes'] },
    );

    expect(history.location.pathname).toBe('/favorite-recipes');
  });
});
