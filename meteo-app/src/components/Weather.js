import React, { useState, useEffect } from 'react';

const Weather = ({ city }) => {
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
    // Associer les codes d'icône météo aux images locales
    const iconMap = {
        '01d': require('../img/soleil.png'), // ciel dégagé jour
        '01n': require('../img/soleil.png'), // ciel dégagé nuit (même image)
        '02d': require('../img/nuage.webp'), // quelques nuages jour
        '02n': require('../img/nuage.webp'),
        '03d': require('../img/nuage.webp'), // nuages épars
        '03n': require('../img/nuage.webp'),
        '04d': require('../img/nuage.webp'), // nuages brisés
        '04n': require('../img/nuage.webp'),
        '09d': require('../img/pluie.png'), // pluie
        '09n': require('../img/pluie.png'),
        '10d': require('../img/pluie.png'), // pluie modérée
        '10n': require('../img/pluie.png'),
        '11d': require('../img/orage.png'), // orage
        '11n': require('../img/orage.png'),
        '13d': require('../img/neige.png'), // neige
        '13n': require('../img/neige.png'),
        '50d': require('../img/vent.png'), // brouillard/vent
        '50n': require('../img/vent.png'),
    };
    const iconCode = weather && weather[0] ? weather[0].icon : '';
    const iconUrl = iconMap[iconCode] || require('../img/soleil.png');

    return (
        <div>
            <h2>Météo à {city}</h2>
            <img src={iconUrl} alt={weather[0].description} style={{ width: 80, height: 80 }} />
            <p>Température : {main.temp}°C</p>
            <p>Description : {weather[0].description}</p>
            <p>Humidité : {main.humidity}%</p>
            <p>Vent : {wind.speed} m/s</p>
        </div>
    );
};

export default Weather;
