import React from 'react';
import { Link } from 'react-router-dom';


const Header = () => (
    <header style={{
        width: '100%',
        background: '#282c34',
        color: 'white',
        padding: '16px 0',
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        boxShadow: '0 2px 8px rgba(0,0,0,0.1)'
    }}>
        <nav style={{ marginBottom: 0 }}>
            <Link to="/" style={{ color: 'white', textDecoration: 'none', fontWeight: 'bold', fontSize: 22 }}>
                Recherche de recettes
            </Link>
        </nav>
    </header>
);

export default Header;
