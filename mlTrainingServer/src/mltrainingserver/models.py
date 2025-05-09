"""
Data models for the ML training service.
"""
from enum import Enum
from typing import Dict, List, Optional, Union, Any
from pydantic import BaseModel, Field

class TrainingStatus(str, Enum):
    PENDING = "pending"
    RUNNING = "running"
    COMPLETE = "complete"
    FAILED = "failed"

class DatasetInfo(BaseModel):
    hash: str = Field(..., description="Hash of the dataset")
    features: List[str] = Field(..., description="List of feature column names")
    target: str = Field(..., description="Target column name")
    encrypted_blob_id: str = Field(..., description="Encrypted blob ID for dataset download")

class TrainingRequest(BaseModel):
    dataset_hash: str = Field(..., description="Hash of the dataset to use for training")
    algorithm: str = Field(..., description="Name of the algorithm to use")
    params: Dict[str, Union[str, int, float, bool]] = Field(
        default_factory=dict,
        description="Algorithm-specific parameters"
    )
    features: Optional[List[str]] = Field(None, description="List of features to use for training")
    target: Optional[str] = Field(None, description="Target column name")

    model_config = {
        "json_schema_extra": {
            "example": {
                "dataset_hash": "abc123",
                "algorithm": "linear_regression",
                "params": {
                    "fit_intercept": True,
                    "normalize": False
                },
                "features": ["feature1", "feature2"],
                "target": "target_column"
            }
        }
    }

class TrainingResponse(BaseModel):
    job_id: str = Field(..., description="Unique identifier for the training job")
    status: TrainingStatus = Field(..., description="Current status of the training job")
    created_at: str = Field(..., description="Timestamp when the job was created")

    model_config = {
        "json_schema_extra": {
            "example": {
                "job_id": "job_123",
                "status": "pending",
                "created_at": "2024-05-09T12:00:00Z"
            }
        }
    }

class TrainingMetrics(BaseModel):
    accuracy: Optional[float] = Field(None, description="Model accuracy score")
    loss: Optional[float] = Field(None, description="Training loss value")
    training_time: float = Field(..., description="Time taken for training in seconds")
    model_size: int = Field(..., description="Size of the trained model in bytes")

    model_config = {
        "json_schema_extra": {
            "example": {
                "accuracy": 0.95,
                "loss": 0.05,
                "training_time": 1.5,
                "model_size": 1024
            }
        }
    }

class AlgorithmParameter(BaseModel):
    type: str
    default: Any
    description: str
    options: Optional[List[str]] = None

    model_config = {
        "json_schema_extra": {
            "example": {
                "type": "int",
                "default": 100,
                "description": "Number of trees in the forest",
                "options": None
            }
        }
    }

class AlgorithmInfo(BaseModel):
    name: str
    description: str
    type: str
    parameters: Dict[str, AlgorithmParameter]

    model_config = {
        "json_schema_extra": {
            "example": {
                "name": "Random Forest Classifier",
                "description": "An ensemble learning method that operates by constructing multiple decision trees",
                "type": "classification",
                "parameters": {
                    "n_estimators": {
                        "type": "int",
                        "default": 100,
                        "description": "Number of trees in the forest"
                    }
                }
            }
        }
    }

class AvailableAlgorithms(BaseModel):
    algorithms: Dict[str, AlgorithmInfo]

    model_config = {
        "json_schema_extra": {
            "example": {
                "algorithms": {
                    "random_forest": {
                        "name": "Random Forest Classifier",
                        "description": "An ensemble learning method that operates by constructing multiple decision trees",
                        "type": "classification",
                        "parameters": {
                            "n_estimators": {
                                "type": "int",
                                "default": 100,
                                "description": "Number of trees in the forest"
                            }
                        }
                    }
                }
            }
        }
    } 