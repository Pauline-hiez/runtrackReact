

import './App.css';
import React, { useState } from 'react';
import { BrowserRouter as Router, Routes, Route, useNavigate } from 'react-router-dom';
import Header from './components/Header';
import SearchBar from './components/SearchBar';
import Home from './pages/Home';
import SearchResults from './pages/SearchResults';
import RecipeDetail from './pages/RecipeDetail';

function App() {
  const [meals, setMeals] = useState([]);

  // Pour la recherche globale depuis le header
  const handleSearch = async (query, navigate) => {
    if (!query || query.length < 2) return;
    const res = await fetch(`https://www.themealdb.com/api/json/v1/1/search.php?s=${query}`);
    const data = await res.json();
    setMeals(data.meals || []);
    navigate('/resultats');
  };

  // Pour l'autocomplétion (sélection d'une suggestion)
  const handleSelectMeal = (meal, navigate) => {
    navigate(`/recette/${meal.idMeal}`);
  };


  // Wrapper pour injecter navigate dans les handlers pour la SearchBar
  const SearchBarWithNav = () => {
    const navigate = useNavigate();
    return (
      <div style={{ display: 'flex', justifyContent: 'center', margin: '32px 0' }}>
        <SearchBar
          onSelectMeal={(meal) => handleSelectMeal(meal, navigate)}
          onSearch={(query) => handleSearch(query, navigate)}
        />
      </div>
    );
  };

  return (
    <Router>
      <Header />
      <SearchBarWithNav />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/resultats" element={<SearchResults meals={meals} />} />
        <Route path="/recette/:id" element={<RecipeDetail />} />
      </Routes>
    </Router>
  );
}

export default App;
