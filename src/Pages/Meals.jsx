import React from 'react';
import Footer from '../components/Footer';
import Header from '../components/Header';
import RecipesList from '../components/RecipesList';
// import SearchBar from '../components/SearchBar';

export default function Home() {
  return (
    <div>
      <Header />
      <RecipesList />
      <Footer />
    </div>
  );
}
