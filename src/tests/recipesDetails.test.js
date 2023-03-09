import { screen } from '@testing-library/react';
import { wait } from '@testing-library/user-event/dist/utils';
import React from 'react';
import userEvent from '@testing-library/user-event';
import App from '../App';
import { renderWithRouter } from './helpers/renderWith';
import RecipesProvider from '../context/RecipesProvider';

const searchTopBtn = 'search-top-btn';
const searchInput = 'search-input';
const exercBtn = 'exec-search-btn';

describe('test details page', () => {
  it('Tests whether when searching for a specific recipe, the page navigates to that recipes details in meals', async () => {
    const { history } = renderWithRouter(
      <RecipesProvider>
        <App />
      </RecipesProvider>,
      { initialEntries: ['/meals'] },
    );

    userEvent.click(screen.getByTestId(searchTopBtn));
    userEvent.type(screen.getByTestId(searchInput), 'Sushi');
    const radios = screen.getAllByRole('radio');
    userEvent.click(radios[1]);
    userEvent.click(screen.getByTestId(exercBtn));

    await wait(1500);
    expect(history.location.pathname).toBe('/meals/53065');
    await wait(1500);
    screen.getByTestId('recipe-photo');
    screen.getByRole('heading', { name: /Sushi/i });
    screen.getByRole('heading', { name: /Seafood/i });
  });

  it('Tests whether when searching for a specific recipe, the page navigates to that recipes details in drinks', async () => {
    const { history } = renderWithRouter(
      <RecipesProvider>
        <App />
      </RecipesProvider>,
      { initialEntries: ['/drinks'] },
    );

    userEvent.click(screen.getByTestId(searchTopBtn));
    userEvent.type(screen.getByTestId(searchInput), 'Mojito Extra');
    const radios = screen.getAllByRole('radio');
    userEvent.click(radios[1]);
    userEvent.click(screen.getByTestId(exercBtn));

    await wait(1500);
    expect(history.location.pathname).toBe('/drinks/15841');
    await wait(1500);
    screen.getByTestId('recipe-photo');
    screen.getByRole('heading', { name: /Mojito Extra/i });
    screen.getByRole('heading', { name: /Alcoholic/i });
  });

  it('Tests the buttons of the Recipes component', async () => {
    renderWithRouter(
      <RecipesProvider>
        <App />
      </RecipesProvider>,
      { initialEntries: ['/meals'] },
    );
    await wait(1500);
    const beefButton = screen.getByRole('button', {
      name: /beef/i,
    });

    const breakfastButton = screen.getByRole('button', {
      name: /breakfast/i,
    });

    const chickenButton = screen.getByRole('button', {
      name: /chicken/i,
    });

    const dessertButton = screen.getByRole('button', {
      name: /dessert/i,
    });

    const goatButton = screen.getByRole('button', {
      name: /goat/i,
    });

    expect(beefButton).toBeInTheDocument();
    expect(breakfastButton).toBeInTheDocument();
    expect(chickenButton).toBeInTheDocument();
    expect(dessertButton).toBeInTheDocument();
    expect(goatButton).toBeInTheDocument();
  });

  it('Tests whether when searching for a specific recipe, the page navigates to that recipes details', async () => {
    renderWithRouter(
      <RecipesProvider>
        <App />
      </RecipesProvider>,
      { initialEntries: ['/meals/52977'] },
    );
    await wait(1500);
    const title = screen.getByRole('heading', { name: /corba/i });
    const ingredient = screen.getByText(/lentils: 1 cup/i);
    const instruction = screen.getByText(/pick through your lentils for any foreign debris, rinse them 2 or 3 times, drain, and set aside\. fair warning, this will probably turn your lentils into a solid block that you’ll have to break up later in a large pot over medium-high heat, sauté the olive oil and the onion with a pinch of salt for about 3 minutes, then add the carrots and cook for another 3 minutes\. add the tomato paste and stir it around for around 1 minute\. now add the cumin, paprika, mint, thyme, black pepper, and red pepper as quickly as you can and stir for 10 seconds to bloom the spices\. congratulate yourself on how amazing your house now smells\. immediately add the lentils, water, broth, and salt\. bring the soup to a \(gentle\) boil\. after it has come to a boil, reduce heat to medium-low, cover the pot halfway, and cook for 15-20 minutes or until the lentils have fallen apart and the carrots are completely cooked\. after the soup has cooked and the lentils are tender, blend the soup either in a blender or simply use a hand blender to reach the consistency you desire\. taste for seasoning and add more salt if necessary\. serve with crushed-up crackers, torn up bread, or something else to add some extra thickness\. you could also use a traditional thickener \(like cornstarch or flour\), but i prefer to add crackers for some texture and saltiness\. makes great leftovers, stays good in the fridge for about a week\./i);
    const buttonStart = screen.getByRole('button', { name: /start recipe/i });
    const buttonShare = screen.getByRole('button', { name: /share/i });
    expect(title).toBeInTheDocument();
    expect(ingredient).toBeInTheDocument();
    expect(instruction).toBeInTheDocument();
    expect(buttonStart).toBeInTheDocument();
    expect(buttonShare).toBeInTheDocument();
  });

  it('Tests whether when searching for a specific recipe, the page navigates to that recipes details', async () => {
    renderWithRouter(
      <RecipesProvider>
        <App />
      </RecipesProvider>,
      { initialEntries: ['/drinks/11034'] },
    );
    await wait(1500);
    const title = screen.getByRole('heading', { name: /Angel Face/i });
    const ingredient = screen.getByText('Apricot brandy: 1/2 oz');
    const buttonStart = screen.getByRole('button', { name: /start recipe/i });
    const buttonShare = screen.getByRole('button', { name: /share/i });
    expect(title).toBeInTheDocument();
    expect(ingredient).toBeInTheDocument();
    expect(buttonStart).toBeInTheDocument();
    expect(buttonShare).toBeInTheDocument();
  });
  it('test button "start recipes" meals', async () => {
    renderWithRouter(
      <RecipesProvider>
        <App />
      </RecipesProvider>,
      { initialEntries: ['/meals/53060'] },
    );
    await wait(1500);
    const startRecipes = screen.getByRole('button', { name: /start recipe/i });
    userEvent.click(startRecipes);
  });

  it('test button "start recipes" drinks', async () => {
    renderWithRouter(
      <RecipesProvider>
        <App />
      </RecipesProvider>,
      { initialEntries: ['/drinks/17222'] },
    );
    await wait(1500);
    const startRecipes = screen.getByRole('button', { name: /start recipe/i });
    userEvent.click(startRecipes);
  });

  it('test button "share"', async () => {
    renderWithRouter(
      <RecipesProvider>
        <App />
      </RecipesProvider>,
      { initialEntries: ['/meals/52978'] },
    );
    await wait(1500);
    const share = screen.getByRole('button', { name: /share/i });
    userEvent.click(share);
    // const text = screen.getByText(/link copied!/i);
    // expect(text).toBeInTheDocument();
    // await wait(3000);
    // expect(text).not.toBeInTheDocument();
  });
  it('test button "favorite"', async () => {
    renderWithRouter(
      <RecipesProvider>
        <App />
      </RecipesProvider>,
      { initialEntries: ['/meals/52775'] },
    );
    await wait(1500);
    const buttonFavorite = screen.getByTestId('favorite-btn');
    userEvent.click(buttonFavorite);
  });
});
