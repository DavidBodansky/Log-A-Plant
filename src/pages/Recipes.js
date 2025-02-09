import React, { useState, useEffect } from 'react';
import api from '../services/api';
import { Container } from 'reactstrap';
import './Recipes.css';
import { getUserID } from '../services/user';

const Recipes = () => {
  const [recipes, setRecipes] = useState([]);

  useEffect(() => {
    async function fetchRecipes() {
      try {
        // Use backticks for a template string:
        const res = await api.get(`/user/${getUserID()}/recipes`);
        setRecipes(res.data || []);
      } catch (error) {
        console.error('Error fetching recipes:', error);
      }
    }
    fetchRecipes();
  }, []);

  return (
    <div className="container">
      <h1 className="set-h1 ai-chat-heading">Recipe Suggestions</h1>
      <div className="recipes-box">
        {recipes.length > 0 ? (
          <ul className="recipes-list">
            {recipes.map((recipe, index) => (
              <li key={index} className="recipe-item">
                {recipe.image_url ?  (
                  <img
                    src={recipe.image_url}
                    alt={recipe.recipe_name}
                    className="recipe-img"
                    style={{ width: '150px', height: 'auto' }}
                  />
                ) : (
                  <img
                    src={require("../images/avocado-question.jpg")}
                    alt="Unknown recipe image"
                    className="recipe-img unknown"
                    style={{ width: '150px', height: 'auto' }}
                  />
                )}
                <h2>{recipe.recipe_name}</h2>
                <p>{recipe.estimated_cook_time} minutes<svg 
        className="clock" 
        viewBox="0 0 24 24" 
        fill="none" 
        xmlns="http://www.w3.org/2000/svg"
      >
        <path 
          d="M12 7V12L14.5 10.5M21 12C21 16.9706 16.9706 21 12 21C7.02944 21 3 16.9706 3 12C3 7.02944 7.02944 3 12 3C16.9706 3 21 7.02944 21 12Z" 
          stroke="currentColor" 
          strokeWidth="2" 
          strokeLinecap="round" 
          strokeLinejoin="round"
        />
      </svg></p>
                <p>Ingredients: {recipe.ingredients.join(', ')}</p>
              </li>
            ))}
          </ul>
        ) : (
          <p>Loading, please stand by 😎</p>
        )}
      </div>
    </div>
  );
};

export default Recipes;
