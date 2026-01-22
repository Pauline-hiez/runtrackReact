import React from 'react';

const SearchHistory = ({ history, onSelect }) => {
    if (!history || history.length === 0) return null;
    return (
        <div style={{ margin: '20px 0' }}>
            <h3>Historique de recherche</h3>
            <ul style={{ listStyle: 'none', padding: 0, display: 'flex', flexWrap: 'wrap', gap: 8 }}>
                {history.map((city, idx) => (
                    <li key={city + idx}>
                        <button onClick={() => onSelect(city)} style={{ padding: '4px 10px', fontSize: 14 }}>
                            {city}
                        </button>
                    </li>
                ))}
            </ul>
        </div>
    );
};

export default SearchHistory;
