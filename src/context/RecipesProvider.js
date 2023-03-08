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

  const value = useMemo(() => ({
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
  }), [user, stateApi, recipes, handleStart, alert]);
  return (
    <RecipesContext.Provider value={ value }>
      { children }
    </RecipesContext.Provider>
  );
}

RecipesProvider.propTypes = {
  children: PropTypes.node.isRequired,
};
