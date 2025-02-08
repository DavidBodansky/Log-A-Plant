from openai import OpenAI as OAI
from config import Config
from typing import List
import json
import markdown

class OpenAI:
    @staticmethod
    def recipe_reqs(plants: List[str]):
        try:
            prompt = '''This prompt is dedicated to provide more sustainable and environmentally friendly solutions.
            We will give you a list of plants they have in inventory, and you will return a very speicific JSON object
            that describes recipes you can build with the ingredients. You may use ingredients that don't exist in the list aswell.
            If there we're no plants passed, simply provide vegetable oriented recipes to get them on the right track! You must
            generate at 9 different recipes, no less, no more. This will be your JSON object:
            {
              "recipe_name": string,
              "ingredients": string[],
              "estimated_cook_time": number
            }[]
            
            UNDER NO CIRCUMSTANCES WILL YOU RETURN A JSON THAT DOES NOT FOLLOW THAT FORMAT. NO ADDITIONAL COMMENTS,
            I WANT A JSON PARSABLE RESPONSE WITH THAT EXACT STRUCTURE.
            DO NOT SEND IT BACK AS A JSON TYPE. SIMPLY SEND IT BACK AS A STRING VALUE. NO  JSON TYPES.
            Here is the list of plants: ''' + ", ".join(plants)
            # Initialize OpenAI client
            client = OAI(api_key=Config.OPENAI_API_KEY)

            # Send the prompt to OpenAI
            chat_completion = client.chat.completions.create(
                model="gpt-4o-mini",
                messages=[{"role": "user", "content": prompt}]
            )

            # Extract and format the response
            if chat_completion.choices:
                return json.loads(chat_completion.choices[0].message.content)

            return "No response from OpenAI."

        except Exception as e:
            return f"Error: {str(e)}"
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
