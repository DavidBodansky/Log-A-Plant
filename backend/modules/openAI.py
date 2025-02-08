from openai import OpenAI as OAI
from modules.spoonacular import Spoonacular
from config import Config
from typing import List
import json
import markdown

class OpenAI:
    @staticmethod
    def recipe_reqs(plants: List[str]):
        prompt = '''This prompt is dedicated to provide more sustainable and environmentally friendly solutions.
        We will give you a list of plants they have in inventory, and you will return a very specific JSON object
        that describes recipes you can build with the ingredients. You may use ingredients that don't exist in the list as well.
        If there were no plants passed, simply provide vegetable oriented recipes to get them on the right track! You must
        generate 9 different recipes, no less, no more. Each recipe must include a visually appealing image URL from a public domain
        or creative commons source. This will be your JSON object:
        {
            "recipe_name": string,
            "ingredients": string[],
            "estimated_cook_time": number,
        }[]
        
        UNDER NO CIRCUMSTANCES WILL YOU RETURN A JSON THAT DOES NOT FOLLOW THAT FORMAT. NO ADDITIONAL COMMENTS,
        I WANT A JSON PARSABLE RESPONSE WITH THAT EXACT STRUCTURE.
        DO NOT SEND IT BACK AS A JSON TYPE. SIMPLY SEND IT BACK AS A STRING VALUE. NO JSON TYPES.
        ENSURE ALL IMAGE URLS ARE FROM PUBLICLY ACCESSIBLE SOURCES AND ARE RELEVANT TO THE RECIPE.
        Here is the list of plants: ''' + ", ".join(plants)
        # Initialize OpenAI client
        return json.loads('''[
  {
    "estimated_cook_time": 15,
    "image_url": "https://img.spoonacular.com/recipes/636356-312x231.jpg",
    "ingredients": [
      "Tomatoes",
      "Fresh basil",
      "Baguette",
      "Garlic",
      "Olive oil",
      "Salt",
      "Pepper"
    ],
    "recipe_name": "Tomato Basil Bruschetta"
  },
  {
    "estimated_cook_time": 10,
    "image_url": "https://img.spoonacular.com/recipes/657537-312x231.jpg",
    "ingredients": [
      "Tomatoes",
      "Fresh mozzarella",
      "Basil",
      "Olive oil",
      "Balsamic vinegar",
      "Salt",
      "Pepper"
    ],
    "recipe_name": "Caprese Salad"
  },
  {
    "estimated_cook_time": 30,
    "image_url": "https://img.spoonacular.com/recipes/715437-312x231.jpg",
    "ingredients": [
      "Tomatoes",
      "Onions",
      "Garlic",
      "Vegetable broth",
      "Olive oil",
      "Salt",
      "Pepper"
    ],
    "recipe_name": "Tomato Soup"
  },
  {
    "estimated_cook_time": 40,
    "image_url": "https://img.spoonacular.com/recipes/645978-312x231.jpg",
    "ingredients": [
      "Tomatoes",
      "Quinoa",
      "Feta cheese",
      "Spinach",
      "Olive oil",
      "Salt",
      "Pepper"
    ],
    "recipe_name": "Stuffed Tomatoes"
  },
  {
    "estimated_cook_time": 15,
    "image_url": "https://img.spoonacular.com/recipes/716416-312x231.jpg",
    "ingredients": [
      "Tomatoes",
      "Cucumbers",
      "Red onion",
      "Olive oil",
      "Lemon juice",
      "Salt",
      "Pepper"
    ],
    "recipe_name": "Tomato and Cucumber Salad"
  },
  {
    "estimated_cook_time": 25,
    "image_url": "https://img.spoonacular.com/recipes/660822-312x231.jpg",
    "ingredients": [
      "Spaghetti",
      "Tomatoes",
      "Garlic",
      "Olive oil",
      "Basil",
      "Salt",
      "Pepper"
    ],
    "recipe_name": "Spaghetti with Tomato Sauce"
  },
  {
    "estimated_cook_time": 15,
    "image_url": "https://img.spoonacular.com/recipes/664025-312x231.jpg",
    "ingredients": [
      "Tomatoes",
      "Onion",
      "Cilantro",
      "Lime juice",
      "Jalape\\u00f1o",
      "Salt"
    ],
    "recipe_name": "Tomato Salsa"
  },
  {
    "estimated_cook_time": 35,
    "image_url": "https://img.spoonacular.com/recipes/652716-312x231.jpg",
    "ingredients": [
      "Pasta",
      "Tomatoes",
      "Garlic",
      "Olive oil",
      "Parmesan cheese",
      "Salt",
      "Pepper"
    ],
    "recipe_name": "Roasted Tomato Pasta"
  },
  {
    "estimated_cook_time": 10,
    "image_url": null,
    "ingredients": [
      "Bread",
      "Tomatoes",
      "Avocado",
      "Olive oil",
      "Salt",
      "Pepper"
    ],
    "recipe_name": "Tomato & Avocado Toast"
  }
]''')
        client = OAI(api_key=Config.OPENAI_API_KEY)

        # Send the prompt to OpenAI
        chat_completion = client.chat.completions.create(
            model="gpt-4o-mini",
            messages=[{"role": "user", "content": prompt}]
        )

        # Extract and format the response
        if chat_completion.choices:
            data = json.loads(chat_completion.choices[0].message.content)
            for i in range(len(data)):
                item = data[i]
                if 'recipe_name' not in item:
                    continue
                image_url = Spoonacular.get_recipe_image(item['recipe_name'])
                data[i]['image_url'] = image_url
            return data

        return "No response from OpenAI."
    @staticmethod
    def ask(prompt: str):
        try:
            # Initialize OpenAI client
            client = OAI(api_key=Config.OPENAI_API_KEY)

            # Send the prompt to OpenAI
            chat_completion = client.chat.completions.create(
                model="gpt-4o-mini",
                messages=[{"role": "user", "content": prompt}]
            )

            # Extract and format the response
            if chat_completion.choices:
                response_text = chat_completion.choices[0].message.content.strip()
                
                # Convert response to Markdown for better formatting
                formatted_text = markdown.markdown(response_text)
                
                return formatted_text

            return "No response from OpenAI."

        except Exception as e:
            return f"Error: {str(e)}"
