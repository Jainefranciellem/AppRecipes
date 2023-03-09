import { screen } from '@testing-library/react';
import { wait } from '@testing-library/user-event/dist/utils';
import userEvent from '@testing-library/user-event';
import { renderWithRouter } from './helpers/renderWith';
import fetchMock from '../../cypress/mocks/fetch';
import App from '../App';
import RecipesProvider from '../context/RecipesProvider';

const searchTopBtn = 'search-top-btn';
const searchInput = 'search-input';
const exercBtn = 'exec-search-btn';

describe('All tests from Search', () => {
  beforeEach(() => {
    jest.spyOn(global, 'fetch').mockResolvedValue({
      json: jest.fn().mockResolvedValue(fetchMock),
    });
  });

  it('test Alert drinks', async () => {
    // jest.spyOn(global, 'alert');
    global.alert = jest.fn();
    renderWithRouter(
      <RecipesProvider>
        <App />
      </RecipesProvider>,
      { initialEntries: ['/drinks'] },
    );
    userEvent.click(screen.getByTestId(searchTopBtn));
    userEvent.type(screen.getByTestId(searchInput), 'aaaa');
    userEvent.click(screen.getByTestId('first-letter-search-radio'));
    userEvent.click(screen.getByTestId(exercBtn));

    expect(global.alert).toHaveBeenCalled();
  });

  it('test Alert meals', async () => {
    global.alert = jest.fn();
    renderWithRouter(
      <RecipesProvider>
        <App />
      </RecipesProvider>,
      { initialEntries: ['/meals'] },
    );
    jest.spyOn(global, 'alert').mockReturnValue('Sorry, we haven\'t found any recipes for these filters');
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
      { initialEntries: ['/drinks'] },
    );
    const searchTop = screen.getByTestId(searchTopBtn);
    userEvent.click(searchTop);
    const radios = screen.getAllByRole('radio');
    const searchBtn = screen.getByTestId(exercBtn);
    userEvent.type(screen.getByTestId(searchInput), 'mojito');
    userEvent.click(radios[0]);
    userEvent.click(searchBtn);
    expect(fetch).toHaveBeenCalled();
  });
  it('tests whether the header renders correctly in the /profile route', () => {
    const { history } = renderWithRouter(
      <RecipesProvider>
        <App />
      </RecipesProvider>,
      { initialEntries: ['/drinks'] },
    );
    const profile = screen.getByRole('button', { name: /profile-icon/i });
    userEvent.click(profile);
    const { pathname } = history.location;
    expect(pathname).toBe('/profile');
  });
  it('Tests if it is filtered by name correctly', async () => {
    renderWithRouter(
      <RecipesProvider>
        <App />
      </RecipesProvider>,
      { initialEntries: ['/meals'] },
    );
    userEvent.click(screen.getByTestId(searchTopBtn));
    userEvent.type(screen.getByTestId(searchInput), 'Corba');
    const radios = screen.getAllByRole('radio');
    userEvent.click(radios[1]);
    userEvent.click(screen.getByTestId(exercBtn));
    expect(fetch).toHaveBeenCalled();
    expect(fetch).toHaveBeenCalledWith('https://www.themealdb.com/api/json/v1/1/search.php?s=Corba');
  });

  it('Tests if it is filtered by ingredient correctly', async () => {
    renderWithRouter(
      <RecipesProvider>
        <App />
      </RecipesProvider>,
      { initialEntries: ['/meals'] },
    );
    userEvent.click(screen.getByTestId(searchTopBtn));
    userEvent.type(screen.getByTestId(searchInput), 'Chicken');
    const radios = screen.getAllByRole('radio');
    userEvent.click(radios[0]);
    userEvent.click(screen.getByTestId(exercBtn));
    expect(fetch).toHaveBeenCalled();
    expect(fetch).toHaveBeenCalledWith('https://www.themealdb.com/api/json/v1/1/filter.php?i=Chicken');
  });

  it('Tests whether it is filtered by the first letter correctly', async () => {
    renderWithRouter(
      <RecipesProvider>
        <App />
      </RecipesProvider>,
      { initialEntries: ['/meals'] },
    );
    userEvent.click(screen.getByTestId(searchTopBtn));
    userEvent.type(screen.getByTestId(searchInput), 'C');
    const radios = screen.getAllByRole('radio');
    userEvent.click(radios[2]);
    userEvent.click(screen.getByTestId(exercBtn));
    expect(fetch).toHaveBeenCalled();
    expect(fetch).toHaveBeenCalledWith('https://www.themealdb.com/api/json/v1/1/search.php?f=C');
  });

  it('Tests if it is filtered by ingredient correctly', async () => {
    renderWithRouter(
      <RecipesProvider>
        <App />
      </RecipesProvider>,
      { initialEntries: ['/drinks'] },
    );
    userEvent.click(screen.getByTestId(searchTopBtn));
    userEvent.type(screen.getByTestId(searchInput), 'lemon');
    const radios = screen.getAllByRole('radio');
    userEvent.click(radios[0]);
    userEvent.click(screen.getByTestId(exercBtn));
    expect(fetch).toHaveBeenCalled();
    expect(fetch).toHaveBeenCalledWith('https://www.thecocktaildb.com/api/json/v1/1/filter.php?i=lemon');
  });

  it('Tests if it is filtered by name correctly', async () => {
    renderWithRouter(
      <RecipesProvider>
        <App />
      </RecipesProvider>,
      { initialEntries: ['/drinks'] },
    );
    userEvent.click(screen.getByTestId(searchTopBtn));
    userEvent.type(screen.getByTestId(searchInput), 'mojito');
    const radios = screen.getAllByRole('radio');
    userEvent.click(radios[1]);
    userEvent.click(screen.getByTestId(exercBtn));
    expect(fetch).toHaveBeenCalled();
    expect(fetch).toHaveBeenCalledWith('https://www.thecocktaildb.com/api/json/v1/1/search.php?s=mojito');
  });

  it('Tests whether it is filtered by the first letter correctly', async () => {
    renderWithRouter(
      <RecipesProvider>
        <App />
      </RecipesProvider>,
      { initialEntries: ['/drinks'] },
    );
    userEvent.click(screen.getByTestId(searchTopBtn));
    userEvent.type(screen.getByTestId(searchInput), 'C');
    const radios = screen.getAllByRole('radio');
    userEvent.click(radios[2]);
    userEvent.click(screen.getByTestId(exercBtn));
    expect(fetch).toHaveBeenCalled();
    expect(fetch).toHaveBeenCalledWith('https://www.thecocktaildb.com/api/json/v1/1/search.php?f=C');
  });

  it('Test if 0 recipes are found, the alert is triggered when filtering by name', async () => {
    global.alert = jest.fn();
    renderWithRouter(
      <RecipesProvider>
        <App />
      </RecipesProvider>,
      { initialEntries: ['/meals'] },
    );
    userEvent.click(screen.getByTestId(searchTopBtn));
    userEvent.type(screen.getByTestId(searchInput), 'xablau');
    const radios = screen.getAllByRole('radio');
    userEvent.click(radios[1]);
    userEvent.click(screen.getByTestId(exercBtn));
    expect(global.alert).toHaveBeenCalled();
  });

  it('Test if 0 recipes are found, the alert is triggered when filtering by ingredient', async () => {
    global.alert = jest.fn();
    renderWithRouter(
      <RecipesProvider>
        <App />
      </RecipesProvider>,
      { initialEntries: ['/meals'] },
    );
    userEvent.click(screen.getByTestId(searchTopBtn));
    userEvent.type(screen.getByTestId(searchInput), 'xablau');
    const radios = screen.getAllByRole('radio');
    userEvent.click(radios[0]);
    userEvent.click(screen.getByTestId(exercBtn));
    expect(global.alert).toHaveBeenCalled();
  });

  it('Test if 0 recipes are found, the alert is triggered when filtering by fisrt letter', async () => {
    global.alert = jest.fn();
    renderWithRouter(
      <RecipesProvider>
        <App />
      </RecipesProvider>,
      { initialEntries: ['/meals'] },
    );
    userEvent.click(screen.getByTestId(searchTopBtn));
    userEvent.type(screen.getByTestId(searchInput), 'xabblllaauu');
    const radios = screen.getAllByRole('radio');
    userEvent.click(radios[2]);
    userEvent.click(screen.getByTestId(exercBtn));
    expect(global.alert).toHaveBeenCalled();
  });

  it('Test if 0 recipes are found, the alert is triggered when filtering by fisrt letter', async () => {
    jest.spyOn(global, 'alert');
    renderWithRouter(
      <RecipesProvider>
        <App />
      </RecipesProvider>,
      { initialEntries: ['/drinks'] },
    );
    userEvent.click(screen.getByTestId(searchTopBtn));
    userEvent.type(screen.getByTestId(searchInput), 'xabblllaauu');
    const radios = screen.getAllByRole('radio');
    userEvent.click(radios[2]);
    userEvent.click(screen.getByTestId(exercBtn));
    expect(fetch).toHaveBeenCalled();
    await wait(2000);
    expect(global.alert).toHaveBeenCalledWith('Your search must have only 1 (one) character');
  });
});
