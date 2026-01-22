import React, { useState, useEffect } from 'react';

const Favorites = ({ onSelectCity, favorites, removeFromFavorites }) => {
    return (
        <div className="favorites-list">
            <h3>Villes favorites</h3>
            {(!favorites || favorites.length === 0) && <p>Aucune ville favorite.</p>}
            <ul>
                {favorites && favorites.map(city => (
                    <li key={city} style={{ display: 'flex', flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center' }}>
                        <span
                            onClick={() => onSelectCity(city)}
                            style={{ display: 'flex', alignItems: 'center', cursor: 'pointer', userSelect: 'none' }}
                            title="Afficher la météo de cette ville"
                        >
                            <span role="img" aria-label="coeur" style={{ marginRight: 8 }}>❤️</span> {city}
                        </span>
                        <button onClick={() => removeFromFavorites(city)} style={{ color: 'red', marginLeft: 16 }}>
                            Supprimer
                        </button>
                    </li>
                ))}
            </ul>
        </div>
    );
};

export default Favorites;
