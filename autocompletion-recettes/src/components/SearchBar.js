import React, { useState } from 'react';


const SearchBar = ({ onSelectMeal, onSearch }) => {
    const [query, setQuery] = useState('');
    const [suggestions, setSuggestions] = useState([]);
    const [loading, setLoading] = useState(false);

    const handleChange = async (e) => {
        const value = e.target.value;
        setQuery(value);
        if (value.length < 2) {
            setSuggestions([]);
            return;
        }
        setLoading(true);
        try {
            const res = await fetch(`https://www.themealdb.com/api/json/v1/1/search.php?s=${value}`);
            const data = await res.json();
            if (data.meals) {
                setSuggestions(data.meals.slice(0, 5)); // Limite à 5 suggestions
            } else {
                setSuggestions([]);
            }
        } catch (err) {
            setSuggestions([]);
        }
        setLoading(false);
    };

    const handleSelect = (meal) => {
        setQuery(meal.strMeal);
        setSuggestions([]);
        if (onSelectMeal) onSelectMeal(meal);
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        if (onSearch) onSearch(query);
    };

    return (
        <form onSubmit={handleSubmit} style={{ position: 'relative', width: '340px', display: 'flex', alignItems: 'center', gap: '8px' }}>
            <input
                type="text"
                value={query}
                onChange={handleChange}
                placeholder="Rechercher une recette..."
                style={{ flex: 1, padding: '8px' }}
            />
            <button type="submit" className="main-btn">
                Recherchez
            </button>
            {loading && <div style={{ marginLeft: 8 }}>Chargement...</div>}
            {suggestions.length > 0 && (
                <ul style={{
                    position: 'absolute',
                    top: '36px',
                    left: 0,
                    right: 0,
                    background: 'white',
                    border: '1px solid #ccc',
                    listStyle: 'none',
                    margin: 0,
                    padding: 0,
                    zIndex: 10
                }}>
                    {suggestions.map((meal) => (
                        <li
                            key={meal.idMeal}
                            onClick={() => handleSelect(meal)}
                            style={{ display: 'flex', alignItems: 'center', gap: 8, padding: '8px', cursor: 'pointer' }}
                        >
                            <img src={meal.strMealThumb} alt={meal.strMeal} style={{ width: 32, height: 32, objectFit: 'cover', borderRadius: 4 }} />
                            <span>{meal.strMeal}</span>
                        </li>
                    ))}
                </ul>
            )}
        </form>
    );
};

export default SearchBar;
