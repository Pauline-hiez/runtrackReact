
import React, { useEffect, useState } from 'react';
import { Link, useSearchParams } from 'react-router-dom';

const SearchResults = () => {
    const [searchParams] = useSearchParams();
    const query = searchParams.get('q') || '';
    const [meals, setMeals] = useState(null);
    const [loading, setLoading] = useState(false);

    useEffect(() => {
        if (!query) {
            setMeals(null);
            return;
        }
        setLoading(true);
        fetch(`https://www.themealdb.com/api/json/v1/1/search.php?s=${encodeURIComponent(query)}`)
            .then(res => res.json())
            .then(data => {
                setMeals(data.meals);
                setLoading(false);
            })
            .catch(() => {
                setMeals(null);
                setLoading(false);
            });
    }, [query]);

    if (loading) {
        return <div style={{ textAlign: 'center', marginTop: 40 }}>Chargement...</div>;
    }

    if (!meals) {
        return <div style={{ textAlign: 'center', marginTop: 40 }}>Aucune recette trouvée.</div>;
    }

    return (
        <div style={{ maxWidth: 900, margin: '40px auto' }}>
            <h2>Résultats de recherche pour : <span style={{ color: '#05643cbe' }}>{query}</span></h2>
            <div style={{ display: 'flex', flexWrap: 'wrap', gap: 24, justifyContent: 'center' }}>
                {meals.map((meal) => (
                    <Link key={meal.idMeal} to={`/recette/${meal.idMeal}`} style={{ textDecoration: 'none', color: 'inherit' }}>
                        <div className="search-card" style={{ border: '1px solid #ccc', borderRadius: 8, width: 220, padding: 12, background: '#fff', boxShadow: '0 2px 8px rgba(0,0,0,0.05)', transition: 'transform 0.15s, box-shadow 0.15s' }}>
                            <img src={meal.strMealThumb} alt={meal.strMeal} style={{ width: '100%', borderRadius: 6 }} />
                            <h3 style={{ fontSize: 18, margin: '12px 0 0 0' }}>{meal.strMeal}</h3>
                            <div style={{ fontSize: 14, color: '#666', marginTop: 4 }}>{meal.strCategory}</div>
                        </div>
                    </Link>
                ))}
            </div>
        </div>
    );
};

export default SearchResults;
