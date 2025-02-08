import openai
from config import Config

# Set the API key from the configuration
openai.api_key = Config.OPENAI_API_KEY

def generate_gardening_tip(prompt):
    try:
        response = openai.Completion.create(
            model="text-davinci-003",
            prompt=prompt,
            max_tokens=150
        )
        # Return the generated text trimmed of extra spaces
        return response.choices[0].text.strip()
    except Exception as e:
        print(f"Error generating gardening tip: {e}")
        return "Unable to generate tip at this time."
