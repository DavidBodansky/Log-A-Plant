// src/pages/Recipes.js
import React, { useState, useEffect } from 'react';
import api from '../services/api';

const Recipes = () => {
  const [recipes, setRecipes] = useState([]);

  useEffect(() => {
    // Fetch recipe suggestions from the backend.
    // Adjust query parameters as needed.
    async function fetchRecipes() {
      try {
        const res = await api.get('/recipes?plant=tomato');
        setRecipes(res.data.recipes || []);
      } catch (error) {
        console.error('Error fetching recipes:', error);
      }
    }
    fetchRecipes();
  }, []);

  return (
    <div>
      <h1>Recipe Suggestions</h1>
      {recipes.length > 0 ? (
        <ul>
          {recipes.map((recipe, index) => (
            <li key={index}>
              <strong>{recipe.name}</strong>: {recipe.instructions}
            </li>
          ))}
        </ul>
      ) : (
        <p>No recipes available yet. Log your harvest to see suggestions!</p>
      )}
    </div>
  );
};

export default Recipes;
