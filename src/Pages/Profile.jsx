import React, { useState, useEffect } from 'react';
import { useHistory } from 'react-router-dom';
import Footer from '../components/Footer';
import Header from '../components/Header';
import favorite from '../style/img/favorite.svg';
import done from '../style/img/done.svg';
import logout from '../style/img/Logout.svg';
import '../style/Profile.css';

function Profile() {
  const [userEmail, setUserEmail] = useState({});

  // const getEmail = async () => {
  //   const emailUser = await JSON.parse(localStorage.getItem('user'));
  //   setEmail(emailUser);
  // };

  useEffect(() => {
    const emailUser = JSON.parse(localStorage.getItem('user')) || {};
    setUserEmail(emailUser);
  }, []);

  const history = useHistory();
  return (
    <div className="containerProfile">
      <Header />
      <p className="emailProfile" data-testid="profile-email">
        { userEmail.email }
      </p>
      <button
        className="profile-done-btn"
        data-testid="profile-done-btn"
        onClick={ () => {
          history.push('/done-recipes');
        } }
      >
        <img src={ done } alt="" />
      </button>
      <div className="trace" />
      <button
        className="profile-favorite-btn"
        data-testid="profile-favorite-btn"
        onClick={ () => {
          history.push('/favorite-recipes');
        } }
      >
        <img src={ favorite } alt="" />
      </button>
      <div className="trace" />
      <button
        className="profile-logout-btn"
        data-testid="profile-logout-btn"
        onClick={ () => {
          localStorage.clear();
          history.push('/');
        } }
      >
        <img src={ logout } alt="" />
      </button>
      <Footer />
    </div>
  );
}

export default Profile;
