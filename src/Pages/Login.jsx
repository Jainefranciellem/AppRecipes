/* eslint-disable react-hooks/exhaustive-deps */
import React, { useContext, useEffect, useState } from 'react';
import { useHistory } from 'react-router-dom';
import RecipesContext from '../context/RecipesContext';
import '../style/Login.css';
import logo from '../style/img/logo Recipes App.svg';
import tomates from '../style/img/tomate.svg';

export default function Login() {
  const [isValid, setIsValid] = useState(true);
  const history = useHistory();
  const { user, setUser } = useContext(RecipesContext);

  const validation = () => {
    const number = 6;
    const emailRegex = /^[\w+.]+@\w+\.com$/;
    const pass = user.password.length > number && emailRegex.test(user.email);
    setIsValid(!pass);
  };

  useEffect(() => {
    validation();
  }, [user]);

  const handleClick = () => {
    localStorage.setItem('user', JSON.stringify({ email: user.email }));
    history.push('/meals');
  };

  return (
    <>
      <div className="container">
        <img className="logo" src={ logo } alt="logo" />
      </div>
      <section className="sectionLogin">
        <img className="tomates" src={ tomates } alt="tomates" />
        <h1>Login</h1>
        <input
          data-testid="email-input"
          type="email"
          id="email"
          className="email"
          placeholder="email"
          onChange={ ({ target }) => setUser({ ...user, email: target.value }) }
        />
        <input
          data-testid="password-input"
          type="password"
          id="password"
          className="password"
          placeholder="password"
          onChange={ ({ target }) => setUser({ ...user, password: target.value }) }
        />
        <button
          type="button"
          className="buttonLogin"
          data-testid="login-submit-btn"
          disabled={ isValid }
          onClick={ handleClick }
        >
          ENTER
        </button>
      </section>
    </>
  );
}
