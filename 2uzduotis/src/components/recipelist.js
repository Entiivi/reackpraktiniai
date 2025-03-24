// src/components/RecipeList.js
import React, { useState, useEffect } from 'react';
import RecipeCard from './recipecard';

const RecipeList = () => {
  const [recipes, setRecipes] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const recipesPerPage = 5;

  useEffect(() => {
    // Fetch recipes data from DummyJSON API
    fetch('https://dummyjson.com/recipes')
      .then((res) => res.json())
      .then((data) => {
        // Make sure the data structure contains a "recipes" array
        if (data && data.recipes) {
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
      <h2>Recipes</h2>
      {currentRecipes.map((recipe) => (
        <RecipeCard key={recipe.id} recipe={recipe} />
      ))}
      <div style={{ marginTop: '20px' }}>
        <button onClick={prevPage} disabled={currentPage === 1}>
          Atgal
        </button>
        <button onClick={nextPage} disabled={indexOfLastRecipe >= recipes.length} style={{ marginLeft: '10px' }}>
          Kitas
        </button>
      </div>
    </div>
  );
};

export default RecipeList;
