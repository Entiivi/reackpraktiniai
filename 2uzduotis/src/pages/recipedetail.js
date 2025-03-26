// src/pages/RecipeDetail.js
import React, { useEffect, useState } from 'react';
import { useParams, Link } from 'react-router-dom';
import '../css/recipedetail.css';

const RecipeDetail = () => {
  const { id } = useParams();
  const [recipe, setRecipe] = useState(null);

  useEffect(() => {
    fetch(`https://dummyjson.com/recipes/${id}`)
      .then((res) => res.json())
      .then((data) => setRecipe(data))
      .catch((err) => console.error('Error fetching recipe details:', err));
  }, [id]);

  if (!recipe) return <div className="loading">Loading...</div>;

  return (
    <div className="recipe-detail-container">
      <h2 className="recipe-title">{recipe.name}</h2>
      <div className="detail-box">
        {recipe.image && (
          <img src={recipe.image} alt={recipe.name} className="detail-image" />
        )}
        <div className="detail-text">
          <div className="recipe-info">
            {recipe.cuisine && <p><strong>Cuisine:</strong> {recipe.cuisine}</p>}
            {recipe.difficulty && <p><strong>Difficulty:</strong> {recipe.difficulty}</p>}
            {recipe.servings && <p><strong>Servings:</strong> {recipe.servings}</p>}
            {recipe.prepTimeMinutes && <p><strong>Prep Time:</strong> {recipe.prepTimeMinutes} minutes</p>}
            {recipe.cookTimeMinutes && <p><strong>Cook Time:</strong> {recipe.cookTimeMinutes} minutes</p>}
          </div>
          <div className="recipe-instructions">
            <h3>Instructions</h3>
            {recipe.instructions ? (
              <ol>
                {recipe.instructions.map((step, index) => (
                  <li key={index}>{step}</li>
                ))}
              </ol>
            ) : (
              <p>No instructions available.</p>
            )}
          </div>
        </div>
      </div>
      <Link to="/dashboard" className="back-link">
        Atgal į receptų sąrašą
      </Link>
    </div>
  );
};

export default RecipeDetail;
