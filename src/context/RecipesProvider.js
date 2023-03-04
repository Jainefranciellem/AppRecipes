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

  const value = useMemo(() => ({
    user,
    setUser,
    stateApi,
    setStateApi,
    recipes,
    setRecipes,
  }), [user, stateApi, recipes]);
  return (
    <RecipesContext.Provider value={ value }>
      { children }
    </RecipesContext.Provider>
  );
}

RecipesProvider.propTypes = {
  children: PropTypes.node.isRequired,
};
