import React from 'react';
import { Link } from 'react-router-dom';

const SearchResults = ({ meals }) => {
    if (!meals) {
        return <div style={{ textAlign: 'center', marginTop: 40 }}>Aucune recette trouvée.</div>;
    }
    return (
        <div style={{ maxWidth: 900, margin: '40px auto' }}>
            <h2>Résultats de recherche</h2>
            <div style={{ display: 'flex', flexWrap: 'wrap', gap: 24, justifyContent: 'center' }}>
                {meals.map((meal) => (
                    <Link key={meal.idMeal} to={`/recette/${meal.idMeal}`} style={{ textDecoration: 'none', color: 'inherit' }}>
                        <div style={{ border: '1px solid #ccc', borderRadius: 8, width: 220, padding: 12, background: '#fff', boxShadow: '0 2px 8px rgba(0,0,0,0.05)' }}>
                            <img src={meal.strMealThumb} alt={meal.strMeal} style={{ width: '100%', borderRadius: 6 }} />
                            <h3 style={{ fontSize: 18, margin: '12px 0 0 0' }}>{meal.strMeal}</h3>
                        </div>
                    </Link>
                ))}
            </div>
        </div>
    );
};

export default SearchResults;
