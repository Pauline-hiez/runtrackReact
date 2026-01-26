import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';

const RecipeDetail = () => {
    const { id } = useParams();
    const [meal, setMeal] = useState(null);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const fetchMeal = async () => {
            setLoading(true);
            const res = await fetch(`https://www.themealdb.com/api/json/v1/1/lookup.php?i=${id}`);
            const data = await res.json();
            setMeal(data.meals ? data.meals[0] : null);
            setLoading(false);
        };
        fetchMeal();
    }, [id]);

    if (loading) return <div style={{ textAlign: 'center', marginTop: 40 }}>Chargement...</div>;
    if (!meal) return <div style={{ textAlign: 'center', marginTop: 40 }}>Recette non trouvée.</div>;

    // Récupère les ingrédients et mesures
    const ingredients = [];
    for (let i = 1; i <= 20; i++) {
        const ingredient = meal[`strIngredient${i}`];
        const measure = meal[`strMeasure${i}`];
        if (ingredient && ingredient.trim()) {
            ingredients.push(`${ingredient} - ${measure}`);
        }
    }

    return (
        <div style={{ maxWidth: 700, margin: '40px auto', background: '#fff', borderRadius: 8, padding: 24, boxShadow: '0 2px 8px rgba(0,0,0,0.08)' }}>
            <h2>{meal.strMeal}</h2>
            <img src={meal.strMealThumb} alt={meal.strMeal} style={{ width: 300, borderRadius: 8, marginBottom: 20 }} />
            <h3>Ingrédients</h3>
            <ul>
                {ingredients.map((item, idx) => <li key={idx}>{item}</li>)}
            </ul>
            <h3>Instructions</h3>
            <p style={{ whiteSpace: 'pre-line' }}>{meal.strInstructions}</p>
            {meal.strYoutube && (
                <div style={{ marginTop: 20 }}>
                    <a href={meal.strYoutube} target="_blank" rel="noopener noreferrer">Voir la vidéo</a>
                </div>
            )}
        </div>
    );
};

export default RecipeDetail;
