import React, { useState } from 'react';

const SearchBar = ({ city, onSearch }) => {
    const [inputValue, setInputValue] = useState(city || '');

    const handleInputChange = (e) => {
        setInputValue(e.target.value);
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        if (inputValue.trim()) {
            onSearch(inputValue.trim());
        }
    };

    return (
        <form onSubmit={handleSubmit} style={{ marginBottom: 20 }}>
            <input
                type="text"
                value={inputValue}
                onChange={handleInputChange}
                placeholder="Entrez une ville..."
                style={{ padding: 8, fontSize: 16 }}
            />
            <button type="submit" style={{ padding: 8, fontSize: 16, marginLeft: 8 }}>
                Rechercher
            </button>
        </form>
    );
};

export default SearchBar;
