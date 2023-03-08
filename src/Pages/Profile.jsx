import React, { useState, useEffect } from 'react';
import { useHistory } from 'react-router-dom';
import Footer from '../components/Footer';
import Header from '../components/Header';

function Profile() {
  const [userEmail, setUserEmail] = useState({});

  // const getEmail = async () => {
  //   const emailUser = await JSON.parse(localStorage.getItem('user'));
  //   setEmail(emailUser);
  // };

  useEffect(() => {
    const emailUser = JSON.parse(localStorage.getItem('user')) || {};
    setUserEmail(emailUser);
    console.log(emailUser);
  }, []);

  const history = useHistory();
  return (
    <div>
      <Header />
      <p data-testid="profile-email">
        Email:
        { userEmail.email }
      </p>
      <button
        data-testid="profile-done-btn"
        onClick={ () => {
          history.push('/done-recipes');
        } }
      >
        Done Recipes
      </button>
      <button
        data-testid="profile-favorite-btn"
        onClick={ () => {
          history.push('/favorite-recipes');
        } }
      >
        Favorite Recipes
      </button>
      <button
        data-testid="profile-logout-btn"
        onClick={ () => {
          localStorage.clear();
          history.push('/');
        } }
      >
        Logout
      </button>
      <Footer />
    </div>
  );
}

export default Profile;
