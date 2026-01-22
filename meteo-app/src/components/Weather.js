import React, { useState, useEffect } from 'react';
import Favorites from './Favorites';
import WeatherAnimation from './WeatherAnimation';

const Weather = ({ city, onAddFavorite, favorites, removeFromFavorites, onSelectCity }) => {
    const [weatherData, setWeatherData] = useState(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    useEffect(() => {
        const fetchWeather = async () => {
            setLoading(true);
            setError(null);
            try {
                const apiKey = process.env.REACT_APP_WEATHER_API_KEY;
                const response = await fetch(
                    `https://api.openweathermap.org/data/2.5/weather?q=${encodeURIComponent(city)}&appid=${apiKey}&units=metric&lang=fr`
                );
                if (!response.ok) {
                    if (response.status === 404) {
                        throw new Error('Ville non trouvée');
                    } else {
                        throw new Error('Erreur lors de la récupération des données météo');
                    }
                }
                const data = await response.json();
                setWeatherData(data);
            } catch (err) {
                setWeatherData(null);
                setError(err.message);
            } finally {
                setLoading(false);
            }
        };
        fetchWeather();
    }, [city]);


    if (loading) return <div>Chargement...</div>;
    if (error) return <div>Erreur : {error}</div>;
    if (!weatherData) return null;

    const { main, weather, wind } = weatherData;
    const iconCode = weather && weather[0] ? weather[0].icon : '';

    return (
        <div className="weather-card">
            <h2>Météo à {city}</h2>
            <WeatherAnimation iconCode={iconCode} description={weather[0].description} />
            <div className="temp">{main.temp}°C</div>
            <div className="desc">{weather[0].description}</div>
            <div className="details">Humidité : {main.humidity}%</div>
            <div className="details">Vent : {wind.speed} m/s</div>
            {onAddFavorite && (
                <button onClick={() => onAddFavorite(city)} style={{ marginTop: 10 }}>
                    Ajouter aux favoris
                </button>
            )}
            {favorites && (
                <Favorites
                    onSelectCity={onSelectCity}
                    favorites={favorites}
                    removeFromFavorites={removeFromFavorites}
                />
            )}
        </div>
    );
};

export default Weather;
