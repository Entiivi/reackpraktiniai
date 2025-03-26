// src/components/RecipeList.js
import React, { useState, useEffect } from 'react';
import RecipeCard from './recipecard';
import '../css/recipelist.css';

const RecipeList = () => {
  const [recipes, setRecipes] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const recipesPerPage = 5;

  useEffect(() => {
    fetch('https://dummyjson.com/recipes')
      .then((res) => res.json())
      .then((data) => {
        // If the API returns an array directly, otherwise adjust accordingly:
        if (Array.isArray(data)) {
          setRecipes(data);
        } else if (data && data.recipes) {
          setRecipes(data.recipes);
        }
      })
      .catch((err) => console.error('Error fetching recipes:', err));
  }, []);

  // Calculate pagination indexes
  const indexOfLastRecipe = currentPage * recipesPerPage;
  const indexOfFirstRecipe = indexOfLastRecipe - recipesPerPage;
  const currentRecipes = recipes.slice(indexOfFirstRecipe, indexOfLastRecipe);

  const nextPage = () => {
    if (indexOfLastRecipe < recipes.length) {
      setCurrentPage((prev) => prev + 1);
    }
  };

  const prevPage = () => {
    if (currentPage > 1) {
      setCurrentPage((prev) => prev - 1);
    }
  };

  return (
    <div>
      <h2 style={{ textAlign: 'center', color: '#7D0A0A' }}>Recipes</h2>
      <div className="recipe-list-container">
        {currentRecipes.map((recipe) => (
          <RecipeCard key={recipe.id} recipe={recipe} />
        ))}
      </div>
      <div className="pagination">
        <button onClick={prevPage} disabled={currentPage === 1}>
          Atgal
        </button>
        <button onClick={nextPage} disabled={indexOfLastRecipe >= recipes.length}>
          Kitas
        </button>
      </div>
    </div>
  );
};

export default RecipeList;
