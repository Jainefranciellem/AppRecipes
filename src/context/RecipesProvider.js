import PropTypes from 'prop-types';
import { useMemo, useState } from 'react';
import RecipesContext from './RecipesContext';

export default function RecipesProvider({ children }) {
  const [user, setUser] = useState({
    email: '',
    password: '',
  });

  const value = useMemo(() => ({
    user,
    setUser,
  }), [user]);
  return (
    <RecipesContext.Provider value={ value }>
      { children }
    </RecipesContext.Provider>
  );
}

RecipesProvider.propTypes = {
  children: PropTypes.node.isRequired,
};
