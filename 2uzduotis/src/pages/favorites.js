// src/pages/Favorites.js
import React, { useState, useEffect, useContext, useCallback } from 'react';
import { AuthContext } from '../contexts/AuthContext';
import { Link, useNavigate } from 'react-router-dom';
import '../css/favorites.css';

const Favorites = () => {
  const { user } = useContext(AuthContext);
  const [favorites, setFavorites] = useState([]);
  const navigate = useNavigate();

  const fetchFavorites = useCallback(() => {
    const url = `http://localhost:3001/favorites?userId=${user.id}&t=${Date.now()}`;
    fetch(url, { cache: 'no-store' })
      .then((res) => res.json())
      .then((data) => setFavorites(data))
      .catch((err) => console.error('Error fetching favorites:', err));
  }, [user.id]);

  useEffect(() => {
    if (user) {
      fetchFavorites();
    }
  }, [user, fetchFavorites]);

  const removeFavorite = (id) => {
    console.log('Attempting to remove favorite with id:', id);
    // Use the id as-is (as a string) without converting to a number
    fetch(`http://localhost:3001/favorites/${id}`, {
      method: 'DELETE',
    })
      .then((res) => {
        console.log('Delete response status:', res.status);
        if (!res.ok) {
          throw new Error(`Failed to remove favorite, status: ${res.status}`);
        }
        return res.text();
      })
      .then((text) => {
        console.log('Delete response text:', text);
        fetchFavorites(); // Refresh favorites after deletion
      })
      .catch((err) => {
        console.error(err);
        alert('Error removing favorite');
      });
  };

  const handleAtgal = () => {
    navigate('/dashboard');
  };

  return (
    <div className="favorites-container">
      {/* Header */}
      <header className="favorites-header">
        <h2>Favorites</h2>
        <button className="atgal-button" onClick={handleAtgal}>Atgal i dashboard</button>
      </header>

      {favorites.length === 0 ? (
        <p className="no-favorites">Nėra pridėtų receptų.</p>
      ) : (
        <div className="favorites-grid">
          {favorites.map((recipe) => (
            <div key={recipe.id} className="favorite-card">
              {recipe.image && <img src={recipe.image} alt={recipe.name} />}
              <h3>{recipe.name}</h3>
              <p>
                {recipe.instructions
                  ? recipe.instructions.join(' ').substring(0, 100) + '...'
                  : 'No description available'}
              </p>
              <div className="card-actions">
                <Link to={`/recipe/${recipe.id}`} className="details-link">
                  Skaityti daugiau
                </Link>
                <button className="remove-btn" onClick={() => removeFavorite(recipe.id)}>
                  <svg className="heart-icon" viewBox="0 0 24 24" width="24" height="24">
                    <path
                      fill="#7D0A0A"
                      d="M12 21.35l-1.45-1.32C5.4 15.36 2 12.28 2 8.5 
                        2 5.42 4.42 3 7.5 3c1.74 0 3.41.81 4.5 2.09C13.09 3.81 14.76 3 16.5 
                        3 19.58 3 22 5.42 22 8.5c0 3.78-3.4 6.86-8.55 11.54L12 21.35z"
                    />
                  </svg>
                </button>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default Favorites;
