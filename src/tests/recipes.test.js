import { screen, waitFor } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { renderWithRouter } from './helpers/renderWith';
import App from '../App';
import RecipesProvider from '../context/RecipesProvider';

describe('All tests from Search', () => {
  it('It should navigate to the selected meal page when a meal category is clicked and a specific meal is selected from the list', async () => {
    const { history } = renderWithRouter(
      <RecipesProvider>
        <App />
      </RecipesProvider>,
      { initialEntries: ['/meals'] },
    );
    await waitFor(() => {
      const getBtnBeef = screen.getByRole('button', { name: /beef/i });
      userEvent.click(getBtnBeef);
      const getLink = screen.getByText(/beef and mustard pie/i);
      userEvent.click(getLink);

      expect(history.location.pathname).toBe('/meals/52874');
    });
  });

  it('should navigate to selected drink details page when clicked', async () => {
    const { history } = renderWithRouter(
      <RecipesProvider>
        <App />
      </RecipesProvider>,
      { initialEntries: ['/drinks'] },
    );

    await waitFor(() => {
      const getBtn = screen.getByRole('button', { name: /ordinary drink/i });
      userEvent.click(getBtn);
      const getDrinkBtn = screen.getByText(/gg/i);
      userEvent.click(getDrinkBtn);

      expect(history.location.pathname).toBe('/drinks/15997');
    });
  });

  it('should display all drinks when clicking on "All" button', async () => {
    renderWithRouter(
      <RecipesProvider>
        <App />
      </RecipesProvider>,
      { initialEntries: ['/drinks'] },
    );

    const getBtnAll = screen.getByRole('button', { name: /all/i });
    userEvent.click(getBtnAll);

    await waitFor(() => {
      const algo = screen.getByText(/gg/i);
      expect(algo).toBeInTheDocument();
    });
  });

  it('Conditional food rendering test and hiding selected item in food list', async () => {
    renderWithRouter(
      <RecipesProvider>
        <App />
      </RecipesProvider>,
      { initialEntries: ['/meals'] },
    );

    await waitFor(() => {
      const getBtnBeef = screen.getByRole('button', { name: 'Beef' });
      userEvent.click(getBtnBeef);
      expect(screen.getByText(/beef and mustard pie/i)).toBeInTheDocument();
      userEvent.click(getBtnBeef);
    });

    await waitFor(() => {
      expect(screen.queryByText(/beef and mustard pie/i)).not.toBeInTheDocument();
      expect(screen.getByTestId('0-card-name')).toHaveTextContent('Corba');
    }, { timeout: 3000 });
  });

  it('Should render drinks list and navigate to drink details', async () => {
    const { debug } = renderWithRouter(
      <RecipesProvider>
        <App />
      </RecipesProvider>,
      { initialEntries: ['/drinks'] },
    );

    await waitFor(() => {
      const getBtnBeef = screen.getByRole('button', { name: /ordinary drink/i });
      userEvent.click(getBtnBeef);
      expect(screen.getByText(/3-mile long island iced tea/i)).toBeInTheDocument();
      userEvent.click(getBtnBeef);
    });

    await waitFor(() => {
      debug();
      expect(screen.queryByText(/3-mile long island iced tea/i)).not.toBeInTheDocument();
      expect(screen.queryByText(/gg/i)).toBeInTheDocument();
    }, { timeout: 3000 });
  });
});
