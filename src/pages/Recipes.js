import React, { useState, useEffect } from 'react';
import api from '../services/api';
import { Container } from 'reactstrap';
import './Recipes.css';

const Recipes = () => {
  const [recipes, setRecipes] = useState([]);

  useEffect(() => {
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
    <Container className="garden-dashboard-content mt-4">
      <h1 className="garden-heading">Recipe Suggestions</h1>
      <div className="recipes-box">
        {recipes.length > 0 ? (
          <ul className="recipes-list">
            {recipes.map((recipe, index) => (
              <li key={index} className="recipe-item">
                <strong>{recipe.name}</strong>: {recipe.instructions}
              </li>
            ))}
          </ul>
        ) : (
          <p>No recipes available yet. Log your harvest to see suggestions!</p>
        )}
      </div>
    </Container>
  );
};

export default Recipes;
