import React from 'react';
import { Link } from 'react-router-dom';

const Home = () => (
    <div style={{
        minHeight: '80vh',
        display: 'flex',
        flexDirection: 'column',
        justifyContent: 'center',
        alignItems: 'center',
    }}>
        <h1>Recherchez vos recettes</h1>
        <p>Utilisez la barre de recherche ci-dessus pour trouver une recette !</p>
    </div>
);

export default Home;
