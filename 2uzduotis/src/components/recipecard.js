// src/components/RecipeCard.js
import React from 'react';
import { Link } from 'react-router-dom';

const RecipeCard = ({ recipe }) => {
  const summary = recipe.instructions
    ? recipe.instructions.join(" ").substring(0, 100) + '...'
    : 'No description available';

  const handleFavorite = () => {
    fetch('http://localhost:3001/favorites', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(recipe)
    })
      .then((res) => {
        if (!res.ok) {
          throw new Error('Failed to add to favorites');
        }
        return res.json();
      })
      .then((data) => {
        alert('Recipe added to favorites!');
      })
      .catch((err) => {
        console.error(err);
        alert('Error adding recipe to favorites');
      });
  };

  return (
    <div
      className="recipe-card"
      style={{ border: '1px solid #ccc', margin: '10px', padding: '10px' }}
    >
      <h3>{recipe.name}</h3>
      {recipe.image && (
        <img
          src={recipe.image}
          alt={recipe.name}
          style={{ width: '100%', maxHeight: '200px', objectFit: 'cover' }}
        />
      )}
      <p>{summary}</p>
      <Link to={`/recipe/${recipe.id}`}>Skaityti daugiau</Link>
      <button onClick={handleFavorite} style={{ marginLeft: '10px' }}>
        ❤️
      </button>
    </div>
  );
};

export default RecipeCard;
