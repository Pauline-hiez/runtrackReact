import './App.css';
import Weather from './components/Weather';
import SearchBar from './components/SearchBar';
import { useState, useEffect } from 'react';
import SearchHistory from './components/SearchHistory';
import Favorites from './components/Favorites';



function App() {
  const [city, setCity] = useState('Paris');
  const [favorites, setFavorites] = useState([]);
  const [history, setHistory] = useState([]);

  // Charger les favoris et l'historique au montage
  useEffect(() => {
    const storedFav = localStorage.getItem('favorites');
    if (storedFav) {
      setFavorites(JSON.parse(storedFav));
    }
    const storedHist = localStorage.getItem('history');
    if (storedHist) {
      setHistory(JSON.parse(storedHist));
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
    if (!newCity) return;
    setHistory(prev => {
      const filtered = prev.filter(c => c.toLowerCase() !== newCity.toLowerCase());
      const updated = [newCity, ...filtered].slice(0, 5);
      localStorage.setItem('history', JSON.stringify(updated));
      return updated;
    });
  };

  return (
    <div className="App">
      <header className="App-header">
        <h1>Météo</h1>
        <SearchBar city={city} onSearch={handleSearch} />
        <SearchHistory history={history} onSelect={handleSearch} />
        <Favorites onSelectCity={handleSearch} favorites={favorites} removeFromFavorites={removeFromFavorites} />
        <Weather city={city} onAddFavorite={addToFavorites} />
      </header>
    </div>
  );
}

export default App;
