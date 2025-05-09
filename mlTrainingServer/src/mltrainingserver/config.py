"""
Module containing configuration settings.
"""
from pydantic_settings import BaseSettings
from typing import List

class Settings(BaseSettings):
    """Application settings."""
    
    # API settings
    API_V1_STR: str = "/api/v1"
    PROJECT_NAME: str = "ML Training Service"
    VERSION: str = "1.0.0"
    
    # CORS settings
    BACKEND_CORS_ORIGINS: List[str] = ["*"]
    
    # Security settings
    SECRET_KEY: str = "your-secret-key-here"  # Change in production
    ACCESS_TOKEN_EXPIRE_MINUTES: int = 60 * 24 * 8  # 8 days
    
    # Training settings
    MAX_TRAINING_JOBS: int = 100
    TRAINING_TIMEOUT: int = 3600  # 1 hour in seconds
    
    # Storage settings
    MODEL_STORAGE_PATH: str = "models"
    
    class Config:
        case_sensitive = True
        env_file = ".env"

settings = Settings() 