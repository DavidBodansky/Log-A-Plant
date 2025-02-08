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
    DB_HOST = os.getenv("DB_HOST")
    DB_USER = os.getenv("DB_USER")
    DB_PASS = os.getenv("DB_PASS")
    DB_SCHEMA = os.getenv("DB_SCHEMA")

