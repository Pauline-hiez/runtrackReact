import React, { useState, useEffect } from 'react';

const Favorites = ({ onSelectCity, favorites, removeFromFavorites }) => {
    return (
        <div style={{ margin: '20px 0' }}>
            <h3>Villes favorites</h3>
            {(!favorites || favorites.length === 0) && <p>Aucune ville favorite.</p>}
            <ul style={{ listStyle: 'none', padding: 0 }}>
                {favorites && favorites.map(city => (
                    <li key={city} style={{ marginBottom: 8 }}>
                        <button onClick={() => onSelectCity(city)} style={{ marginRight: 8 }}>
                            {city}
                        </button>
                        <button onClick={() => removeFromFavorites(city)} style={{ color: 'red' }}>
                            Supprimer
                        </button>
                    </li>
                ))}
            </ul>
        </div>
    );
};

export default Favorites;
