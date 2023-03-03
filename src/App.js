import React from 'react';
import { Route, Switch } from 'react-router-dom';
import Meals from './Pages/Meals';
import Login from './Pages/Login';

function App() {
  return (
    <div>
      <Switch>
        <Route exact path="/" component={ Login } />
        <Route exact path="/meals" component={ Meals } />
      </Switch>
    </div>
  );
}

export default App;
