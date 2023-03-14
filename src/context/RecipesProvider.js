import PropTypes from 'prop-types';
import { useMemo, useState } from 'react';
import RecipesContext from './RecipesContext';

export default function RecipesProvider({ children }) {
  const [user, setUser] = useState({
    email: '',
    password: '',
  });
  const [stateApi, setStateApi] = useState('');
  const [recipes, setRecipes] = useState([]);
  const [handleStart, setHandleStart] = useState('');
  const [alert, setAlert] = useState(false);
  const [recipesFiltered, setRecipesFiltered] = useState([]);
  const [typeRecipe, setTypeRecipe] = useState(null);

  const value = useMemo(() => ({
    typeRecipe,
    setTypeRecipe,
    alert,
    setAlert,
    handleStart,
    setHandleStart,
    user,
    setUser,
    stateApi,
    setStateApi,
    recipes,
    setRecipes,
    recipesFiltered,
    setRecipesFiltered,
  }), [user, stateApi, recipes, recipesFiltered, handleStart, alert, typeRecipe]);
  return (
    <RecipesContext.Provider value={ value }>
      { children }
    </RecipesContext.Provider>
  );
}

RecipesProvider.propTypes = {
  children: PropTypes.node.isRequired,
};
