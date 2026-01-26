
import React from 'react';
import { Link, useNavigate } from 'react-router-dom';
import logo from '../img/logo.png';
import SearchBar from './SearchBar';

const Header = ({ onSelectMeal, onSearch }) => {
    const navigate = useNavigate();
    return (
        <header style={{
            width: '100%',
            background: '#05643cbe',
            color: 'white',
            padding: '20px 0',
            minHeight: 100,
            display: 'flex',
            flexDirection: 'row',
            alignItems: 'center',
            boxShadow: '0 8px 32px 0 rgba(5, 40, 20, 0.32), 0 1.5px 8px 0 rgba(5, 100, 60, 0.22)'
        }}>
            <Link to="/" style={{ display: 'flex', alignItems: 'center', marginLeft: 24, marginRight: 24 }}>
                <img src={logo} alt="Logo" style={{ height: 150 }} />
            </Link>
            <div style={{ flex: 1, display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
                <h1 style={{ margin: 0, fontSize: 36, fontWeight: 'bold', textAlign: 'center' }}>
                    Bienvenue sur notre site de recettes
                </h1>
                <div style={{ marginTop: 12 }}>
                    <SearchBar
                        onSelectMeal={(meal) => onSelectMeal(meal, navigate)}
                        onSearch={(query) => onSearch(query, navigate)}
                    />
                </div>
            </div>
            <Link to="/" style={{ display: 'flex', alignItems: 'center', marginLeft: 24, marginRight: 24 }}>
                <img src={logo} alt="Logo" style={{ height: 150 }} />
            </Link>
        </header>
    );
};

export default Header;
