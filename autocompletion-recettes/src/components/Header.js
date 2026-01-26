import React from 'react';
import { Link } from 'react-router-dom';
import logo from '../img/logo.png';


const Header = () => (
    <header style={{
        width: '100%',
        background: '#05643cbe',
        color: 'white',
        padding: '20px 0',
        minHeight: 100,
        display: 'flex',
        flexDirection: 'row',
        alignItems: 'center',
        boxShadow: '0 2px 8px rgba(0,0,0,0.1)'
    }}>
        <Link to="/" style={{ display: 'flex', alignItems: 'center', marginLeft: 24, marginRight: 24 }}>
            <img src={logo} alt="Logo" style={{ height: 150 }} />
        </Link>
        <div style={{ flex: 1, display: 'flex', justifyContent: 'center' }}>
            <h1 style={{ margin: 0, fontSize: 36, fontWeight: 'bold', textAlign: 'center' }}>
                Bienvenue sur notre site de recettes
            </h1>
        </div>
        <Link to="/" style={{ display: 'flex', alignItems: 'center', marginLeft: 24, marginRight: 24 }}>
            <img src={logo} alt="Logo" style={{ height: 150 }} />
        </Link>
    </header>
);

export default Header;
