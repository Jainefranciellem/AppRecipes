import { screen } from '@testing-library/react';
import { wait } from '@testing-library/user-event/dist/utils';
import userEvent from '@testing-library/user-event';
import { renderWithRouter } from './helpers/renderWith';
import App from '../App';
import RecipesProvider from '../context/RecipesProvider';

const searchTopBtn = 'search-top-btn';
const searchInput = 'search-input';
const exercBtn = 'exec-search-btn';

describe('All tests from Search', () => {
  beforeEach(() => {
    jest.spyOn(global, 'fetch').mockResolvedValue({
      json: jest.fn().mockResolvedValue('fetchaApi'),
    });
  });

  it('test render drinks', async () => {
    renderWithRouter(
      <RecipesProvider>
        <App />
      </RecipesProvider>,
      { initialEntries: ['/Meals'] },
    );
  });

  it('test render drinks', async () => {
    renderWithRouter(
      <RecipesProvider>
        <App />
      </RecipesProvider>,
      { initialEntries: ['/Drinks'] },
    );
  });

  it('test Alert drinks', async () => {
    renderWithRouter(
      <RecipesProvider>
        <App />
      </RecipesProvider>,
      { initialEntries: ['/Drinks'] },
    );
    jest.spyOn(global, 'alert').mockReturnValue('Sorry, we haven\'t found any recipes for these filters.');
    userEvent.click(screen.getByTestId(searchTopBtn));
    userEvent.type(screen.getByTestId(searchInput), 'aaaa');
    userEvent.click(screen.getByTestId('first-letter-search-radio'));
    userEvent.click(screen.getByTestId(exercBtn));

    expect(global.alert).toHaveBeenCalled();
  });
  it('Tests interaction of elements in the SearchBar component at url /drinks', () => {
    renderWithRouter(
      <RecipesProvider>
        <App />
      </RecipesProvider>,
      { initialEntries: ['/Drinks'] },
    );
    const searchTop = screen.getByTestId(searchTopBtn);
    userEvent.click(searchTop);
    const radios = screen.getAllByRole('radio');
    const searchBtn = screen.getByTestId(exercBtn);
    userEvent.type(searchInput, 'mojito');
    userEvent.click(radios[0]);
    userEvent.click(searchBtn);
    expect(fetch).toHaveBeenCalled();
  });
  it('testa se o header é rendeizado corretamente na rota /profile ', () => {
    const { history } = renderWithRouter(
      <RecipesProvider>
        <App />
      </RecipesProvider>,
      { initialEntries: ['/Drinks'] },
    );
    const profile = screen.getByRole('button', { name: /profile-icon/i });
    userEvent.click(profile);
    const { pathname } = history.location;
    expect(pathname).toBe('/profile');
  });

  it('Testa se achado 0 receitas o alert é disparado', async () => {
    renderWithRouter(
      <RecipesProvider>
        <App />
      </RecipesProvider>,
      { initialEntries: ['/Meals'] },
    );
    userEvent.click(screen.getByTestId(searchTopBtn));
    userEvent.type(searchInput, 'xabblllaauu');
    const radios = screen.getAllByRole('radio');
    userEvent.click(radios[1]);
    userEvent.click(screen.getByTestId(exercBtn));
    expect(fetch).toHaveBeenCalled();
    await wait(2000);
    jest.spyOn(global, 'alert').mockReturnValue('Sorry, we haven\'t found any recipes for these filters.');
  });
});
