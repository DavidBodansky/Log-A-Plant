import os
from dotenv import load_dotenv

# Load environment variables from .env file
load_dotenv()

class Config:
    ALLOWED_ORIGINS = os.getenv("ALLOWED_ORIGINS", "")
    SECRET_KEY = os.getenv("SECRET_KEY")
    OPENAI_API_KEY = os.getenv("OPENAI_API_KEY")
    DEVELOPMENT = bool(os.getenv("DEVELOPMENT", "1")) # 1 => True, 0 => False
    PORT = int(os.getenv("PORT", "5000"))

