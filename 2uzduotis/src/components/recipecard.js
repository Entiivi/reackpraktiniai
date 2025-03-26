// src/components/RecipeCard.js
import React from 'react';
import { Link } from 'react-router-dom';
import '../css/recipecard.css';

const RecipeCard = ({ recipe }) => {
  const summary = recipe.instructions
    ? recipe.instructions.join(" ").substring(0, 100) + '...'
    : 'No description available';

    const handleFavorite = () => {
      // 1. Check if recipe already exists in favorites
      fetch(`http://localhost:3001/favorites?id=${recipe.id}`)
        .then((res) => res.json())
        .then((existingFavorites) => {
          if (existingFavorites.length > 0) {
            // The recipe is already in favorites
            alert('This recipe is already in favorites!');
          } else {
            // 2. If not found, add it (ensure the recipe object has a unique id)
            fetch('http://localhost:3001/favorites', {
              method: 'POST',
              headers: { 'Content-Type': 'application/json' },
              body: JSON.stringify(recipe),
            })
              .then((res) => {
                if (!res.ok) {
                  throw new Error('Failed to add to favorites');
                }
                return res.json();
              })
              .then((data) => {
                alert('Recipe added to favorites!');
                // Optionally, update state or perform further actions here.
              })
              .catch((err) => {
                console.error(err);
                alert('Error adding recipe to favorites');
              });
          }
        })
        .catch((err) => {
          console.error(err);
          alert('Error checking favorites');
        });
    };

  return (
    <div className="recipe-card">
      {recipe.image && (
        <img src={recipe.image} alt={recipe.name} />
      )}
      <h3>{recipe.name}</h3>
      <p>{summary}</p>
      <div className='recipe-ap'>
        <Link to={`/recipe/${recipe.id}`}>Skaityti daugiau</Link>
          <svg className="heart-icon" onClick={handleFavorite} viewBox="0 0 24 24" width="24" height="24">
            <path fill="#7D0A0A" d="M12 21.35l-1.45-1.32C5.4 15.36 2 12.28 2 8.5 
              2 5.42 4.42 3 7.5 3c1.74 0 3.41.81 4.5 2.09C13.09 3.81 14.76 3 16.5 
              3 19.58 3 22 5.42 22 8.5c0 3.78-3.4 6.86-8.55 11.54L12 21.35z" />
          </svg>
      </div>
    </div>
  );
};

export default RecipeCard;
