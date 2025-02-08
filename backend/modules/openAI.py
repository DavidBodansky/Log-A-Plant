from openai import OpenAI as OAI
from config import Config
import markdown

class OpenAI:
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
