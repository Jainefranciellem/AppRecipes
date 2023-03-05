import { screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { renderWithRouter } from './helpers/renderWith';
import App from '../App';
import RecipesProvider from '../context/RecipesProvider';

const searchTopBtn = 'search-top-btn';
const searchInput = 'search-input';
const exercBtn = 'exec-search-btn';
describe('All tests from Search', () => {
  it('All tests', async () => {
    renderWithRouter(
      <RecipesProvider>
        <App />
      </RecipesProvider>,
      { initialEntries: ['/Meals'] },
    );
    userEvent.click(screen.getByTestId(searchTopBtn));
    userEvent.type(screen.getByTestId(searchInput), 'chicken');
    userEvent.click(screen.getByTestId('search-input'));
    userEvent.click(screen.getByTestId('ingredient-search-radio'));
    userEvent.click(screen.getByTestId(exercBtn));

    screen.findAllByAltText('Chicken Handi');
  });

  it('test Alert meals', async () => {
    renderWithRouter(
      <RecipesProvider>
        <App />
      </RecipesProvider>,
      { initialEntries: ['/Drinks'] },
    );

    jest.spyOn(global, 'alert').mockReturnValue('Your search must have only 1 (one) character');
    userEvent.click(screen.getByTestId(searchTopBtn));
    userEvent.type(screen.getByTestId(searchInput), 'aaaa');
    userEvent.click(screen.getByTestId('first-letter-search-radio'));
    userEvent.click(screen.getByTestId(exercBtn));
    expect(global.alert).toHaveBeenCalled();
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
  beforeEach(() => {
    jest.spyOn(global, 'fetch').mockResolvedValue({
      json: jest.fn().mockResolvedValue('teste'),
    });
  });
  test('Tests interaction of elements in the SearchBar component at url /meals', () => {
    renderWithRouter(
      <RecipesProvider>
        <App />
      </RecipesProvider>,
      { initialEntries: ['/Meals'] },
    );
    const profile = screen.getByTestId(searchTopBtn);
    userEvent.click(profile);
    const radios = screen.getAllByRole('radio');
    const searchBtn = screen.getByTestId(exercBtn);
    userEvent.type(searchInput, 'avocado');
    userEvent.click(radios[0]);
    userEvent.click(radios[2]);
    userEvent.click(radios[1]);
    userEvent.click(searchBtn);
    userEvent.type(searchInput, 'a');
    userEvent.click(radios[2]);
    userEvent.click(searchBtn);
    expect(fetch).toHaveBeenCalled();
  });

  test('Tests interaction of elements in the SearchBar component at url /drinks', () => {
    renderWithRouter(
      <RecipesProvider>
        <App />
      </RecipesProvider>,
      { initialEntries: ['/Drinks'] },
    );
    const profile = screen.getByTestId(searchTopBtn);
    userEvent.click(profile);
    const radios = screen.getAllByRole('radio');
    const searchBtn = screen.getByTestId(exercBtn);
    userEvent.type(searchInput, 'avocado');
    userEvent.click(radios[0]);
    userEvent.click(radios[2]);
    userEvent.click(radios[1]);
    userEvent.click(searchBtn);
    expect(fetch).toHaveBeenCalled();
    userEvent.type(searchInput, 'a');
    userEvent.click(radios[2]);
    userEvent.click(searchBtn);
  });
});
