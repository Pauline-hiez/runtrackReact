import React, { useState, useRef, useEffect } from 'react';



const SearchBar = ({ onSelectMeal, onSearch }) => {
    const [query, setQuery] = useState('');
    const [suggestions, setSuggestions] = useState([]);
    const [loading, setLoading] = useState(false);
    const [activeIndex, setActiveIndex] = useState(-1);
    const [showSuggestions, setShowSuggestions] = useState(false);
    const inputRef = useRef(null);
    const suggestionsRef = useRef(null);
    const debounceTimeout = useRef(null);

    // Gestion du clic en dehors
    useEffect(() => {
        const handleClickOutside = (event) => {
            if (
                suggestionsRef.current &&
                !suggestionsRef.current.contains(event.target) &&
                inputRef.current &&
                !inputRef.current.contains(event.target)
            ) {
                setShowSuggestions(false);
                setActiveIndex(-1);
            }
        };
        document.addEventListener('mousedown', handleClickOutside);
        return () => {
            document.removeEventListener('mousedown', handleClickOutside);
        };
    }, []);

    // Debounce et suggestions intelligentes
    useEffect(() => {
        if (debounceTimeout.current) clearTimeout(debounceTimeout.current);
        if (query.length < 2) {
            setSuggestions([]);
            setShowSuggestions(false);
            setLoading(false);
            return;
        }
        setLoading(true);
        debounceTimeout.current = setTimeout(async () => {
            try {
                const res = await fetch(`https://www.themealdb.com/api/json/v1/1/search.php?s=${query}`);
                const data = await res.json();
                if (data.meals) {
                    // Séparation intelligente
                    const startsWith = [];
                    const includes = [];
                    data.meals.forEach(meal => {
                        if (meal.strMeal.toLowerCase().startsWith(query.toLowerCase())) {
                            startsWith.push(meal);
                        } else if (meal.strMeal.toLowerCase().includes(query.toLowerCase())) {
                            includes.push(meal);
                        }
                    });
                    // Limite à 10 suggestions (5+5 max)
                    setSuggestions([
                        ...startsWith.slice(0, 5),
                        ...includes.slice(0, 5)
                    ]);
                    setShowSuggestions(true);
                } else {
                    setSuggestions([]);
                    setShowSuggestions(false);
                }
            } catch (err) {
                setSuggestions([]);
                setShowSuggestions(false);
            }
            setLoading(false);
        }, 300);
        // eslint-disable-next-line
    }, [query]);

    const handleChange = (e) => {
        setQuery(e.target.value);
        setActiveIndex(-1);
        setShowSuggestions(true);
    };

    const handleSelect = (meal) => {
        setQuery(meal.strMeal);
        setSuggestions([]);
        setShowSuggestions(false);
        setActiveIndex(-1);
        if (onSelectMeal) onSelectMeal(meal);
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        setShowSuggestions(false);
        setActiveIndex(-1);
        if (onSearch) onSearch(query);
    };

    const handleKeyDown = (e) => {
        if (!showSuggestions || suggestions.length === 0) return;
        if (e.key === 'ArrowDown') {
            e.preventDefault();
            setActiveIndex((prev) => (prev + 1) % suggestions.length);
        } else if (e.key === 'ArrowUp') {
            e.preventDefault();
            setActiveIndex((prev) => (prev - 1 + suggestions.length) % suggestions.length);
        } else if (e.key === 'Enter') {
            if (activeIndex >= 0 && activeIndex < suggestions.length) {
                e.preventDefault();
                handleSelect(suggestions[activeIndex]);
            }
        } else if (e.key === 'Escape') {
            setShowSuggestions(false);
            setActiveIndex(-1);
        }
    };

    // Séparation visuelle startsWith/includes
    let startsWith = [];
    let includes = [];
    if (suggestions.length > 0 && query.length >= 2) {
        suggestions.forEach(meal => {
            if (meal.strMeal.toLowerCase().startsWith(query.toLowerCase())) {
                startsWith.push(meal);
            } else {
                includes.push(meal);
            }
        });
    }

    return (
        <form onSubmit={handleSubmit} style={{ position: 'relative', width: '340px', display: 'flex', alignItems: 'center', gap: '8px' }} autoComplete="off">
            <input
                type="text"
                value={query}
                onChange={handleChange}
                onKeyDown={handleKeyDown}
                placeholder="Rechercher une recette..."
                style={{ flex: 1, padding: '8px', borderRadius: '6px' }}
                ref={inputRef}
                aria-autocomplete="list"
                aria-activedescendant={activeIndex >= 0 ? `suggestion-${activeIndex}` : undefined}
            />
            <button type="submit" className="main-btn" aria-label="Rechercher">
                🔍
            </button>
            {loading && <div style={{ marginLeft: 8 }}>Chargement...</div>}
            {showSuggestions && (startsWith.length > 0 || includes.length > 0) && (
                <ul
                    ref={suggestionsRef}
                    style={{
                        position: 'absolute',
                        top: '36px',
                        left: 0,
                        right: 0,
                        background: 'white',
                        border: '1px solid #ccc',
                        listStyle: 'none',
                        margin: 0,
                        padding: 0,
                        zIndex: 10,
                        maxHeight: 320,
                        overflowY: 'auto'
                    }}
                >
                    {startsWith.length > 0 && (
                        <>
                            {startsWith.map((meal, idx) => (
                                <li
                                    key={meal.idMeal}
                                    id={`suggestion-${idx}`}
                                    onClick={() => handleSelect(meal)}
                                    style={{
                                        display: 'flex',
                                        alignItems: 'center',
                                        gap: 8,
                                        padding: '8px',
                                        cursor: 'pointer',
                                        background: activeIndex === idx ? '#e6f7ee' : 'white',
                                        fontWeight: 'bold'
                                    }}
                                >
                                    <img src={meal.strMealThumb} alt={meal.strMeal} style={{ width: 32, height: 32, objectFit: 'cover', borderRadius: 4 }} />
                                    <span>{meal.strMeal}</span>
                                </li>
                            ))}
                        </>
                    )}
                    {startsWith.length > 0 && includes.length > 0 && (
                        <li style={{ borderTop: '1px solid #eee', padding: '4px 8px', color: '#888', fontSize: 13, background: '#fafafa' }}>
                            Autres résultats
                        </li>
                    )}
                    {includes.length > 0 && (
                        <>
                            {includes.map((meal, idx) => (
                                <li
                                    key={meal.idMeal}
                                    id={`suggestion-${startsWith.length + idx}`}
                                    onClick={() => handleSelect(meal)}
                                    style={{
                                        display: 'flex',
                                        alignItems: 'center',
                                        gap: 8,
                                        padding: '8px',
                                        cursor: 'pointer',
                                        background: activeIndex === (startsWith.length + idx) ? '#e6f7ee' : 'white'
                                    }}
                                >
                                    <img src={meal.strMealThumb} alt={meal.strMeal} style={{ width: 32, height: 32, objectFit: 'cover', borderRadius: 4 }} />
                                    <span>{meal.strMeal}</span>
                                </li>
                            ))}
                        </>
                    )}
                </ul>
            )}
        </form>
    );
};

export default SearchBar;
