// src/pages/RecipeDetail.js
import React, { useEffect, useState } from 'react';
import { useParams, Link } from 'react-router-dom';

const RecipeDetail = () => {
  const { id } = useParams();
  const [recipe, setRecipe] = useState(null);

  useEffect(() => {
    fetch(`https://dummyjson.com/recipes/${id}`)
      .then((res) => res.json())
      .then((data) => setRecipe(data))
      .catch((err) => console.error('Error fetching recipe details:', err));
  }, [id]);

  if (!recipe) return <div>Loading...</div>;

  return (
    <div style={{ padding: '20px' }}>
      <h2>{recipe.title}</h2>
      <p>{recipe.description}</p>
      {/* Add more detailed fields if available */}
      <Link to="/">Atgal į receptų sąrašą</Link>
    </div>
  );
};

export default RecipeDetail;
