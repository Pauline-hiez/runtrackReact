import './App.css';
import Weather from './components/Weather';
import SearchBar from './components/SearchBar';
import { useState } from 'react';


function App() {
  const [city, setCity] = useState('Paris');

  const handleSearch = (newCity) => {
    setCity(newCity);
  };

  return (
    <div className="App">
      <header className="App-header">
        <h1>Météo</h1>
        <SearchBar city={city} onSearch={handleSearch} />
        <Weather city={city} />
      </header>
    </div>
  );
}

export default App;
