import requests
from config import Config

class Spoonacular():
    @staticmethod
    def get_recipe_image(recipe_name):
        """
        Fetch a recipe image using Spoonacular's API.
        
        Args:
            recipe_name (str): Name of the recipe
        
        Returns:
            PIL.Image: Downloaded image object
        """
        # Replace with your Spoonacular API key
        
        # Base URL for Spoonacular API
        base_url = 'https://api.spoonacular.com/recipes/complexSearch'
        
        # Parameters for the search
        params = {
            'apiKey': Config.SPOONACULAR_ACCESS,
            'query': recipe_name,
            'number': 1,  # Get one result
            'addRecipeInformation': True,
            'sort': 'popularity'  # Get the most relevant result
        }
        
        try:
            # Search for the recipe
            response = requests.get(base_url, params=params)
            response.raise_for_status()
            
            data = response.json()
            if data['results']:
                # Get the image URL
                image_url = data['results'][0]['image']
                return image_url
            else:
                return None
        except Exception as e:
            return None
