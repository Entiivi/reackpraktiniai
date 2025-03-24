// src/pages/Favorites.js
import React, { useState, useEffect } from 'react';
import RecipeCard from '../components/recipecard';
import { Link } from 'react-router-dom';

const Favorites = () => {
  const [favorites, setFavorites] = useState([]);

  // Fetch favorites from json-server
  const fetchFavorites = () => {
    fetch('http://localhost:3001/favorites')
      .then((res) => res.json())
      .then((data) => setFavorites(data))
      .catch((err) => console.error('Error fetching favorites:', err));
  };

  useEffect(() => {
    fetchFavorites();
  }, []);

  // Function to remove a recipe from favorites
  const removeFavorite = (id) => {
    fetch(`http://localhost:3001/favorites/${id}`, {
      method: 'DELETE'
    })
      .then((res) => {
        if (!res.ok) {
          throw new Error('Failed to remove favorite');
        }
        return res.json();
      })
      .then(() => {
        fetchFavorites(); // refresh favorites list
      })
      .catch((err) => console.error(err));
  };

  return (
    <div style={{ padding: '20px' }}>
      <h2>Mano Mėgstamiausi Receptai</h2>
      {favorites.length === 0 ? (
        <p>Nėra pridėtų receptų.</p>
      ) : (
        favorites.map((recipe) => (
          <div key={recipe.id} style={{ marginBottom: '20px' }}>
            <RecipeCard recipe={recipe} />
            <button onClick={() => removeFavorite(recipe.id)}>Pašalinti</button>
          </div>
        ))
      )}
      <Link to="/dashboard">Atgal į Dashboard</Link>
    </div>
  );
};

export default Favorites;
