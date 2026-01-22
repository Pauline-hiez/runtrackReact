import './App.css';
import Weather from './components/Weather';
import SearchBar from './components/SearchBar';
import { useState, useEffect } from 'react';
import Favorites from './components/Favorites';



function App() {
  const [city, setCity] = useState('Paris');
  const [favorites, setFavorites] = useState([]);

  // Charger les favoris au montage
  useEffect(() => {
    const stored = localStorage.getItem('favorites');
    if (stored) {
      setFavorites(JSON.parse(stored));
    }
  }, []);

  // Ajouter une ville aux favoris
  const addToFavorites = (cityToAdd) => {
    if (!cityToAdd || favorites.includes(cityToAdd)) return;
    const updated = [...favorites, cityToAdd];
    setFavorites(updated);
    localStorage.setItem('favorites', JSON.stringify(updated));
  };

  // Supprimer une ville des favoris
  const removeFromFavorites = (cityToRemove) => {
    const updated = favorites.filter(fav => fav !== cityToRemove);
    setFavorites(updated);
    localStorage.setItem('favorites', JSON.stringify(updated));
  };

  const handleSearch = (newCity) => {
    setCity(newCity);
  };

  return (
    <div className="App">
      <header className="App-header">
        <h1>Météo</h1>
        <SearchBar city={city} onSearch={handleSearch} />
        <Favorites onSelectCity={handleSearch} favorites={favorites} removeFromFavorites={removeFromFavorites} />
        <Weather city={city} onAddFavorite={addToFavorites} />
      </header>
    </div>
  );
}

export default App;
