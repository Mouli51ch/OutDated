"""
Training module for ML training service.
"""
import logging
import os
import time
import uuid
from datetime import datetime
from typing import Dict, Any, Optional
import pandas as pd
from sklearn.linear_model import LinearRegression
from sklearn.metrics import mean_squared_error, r2_score
import joblib
from pathlib import Path

from .models import TrainingStatus, TrainingMetrics
from .getDataset import download_dataset

# Configure logging
logging.basicConfig(level=logging.INFO)
logger = logging.getLogger(__name__)

# In-memory job store
jobs: Dict[str, Dict[str, Any]] = {}

def validate_access(dataset_hash: str) -> bool:
    """Validate access to the dataset."""
    # TODO: Implement actual access validation
    return True

def run_training(job_id: str, dataset_hash: str, algorithm: str, params: Dict[str, Any],
                features: Optional[list] = None, target: Optional[str] = None) -> None:
    """Run the training process for a job."""
    dataset_path = None
    try:
        # Update job status
        jobs[job_id]["status"] = TrainingStatus.RUNNING
        jobs[job_id]["started_at"] = datetime.utcnow().isoformat()

        # Download dataset
        logger.info(f"Downloading dataset for job {job_id}")
        dataset_path = Path("datasets") / f"{job_id}.csv"
        dataset_path.parent.mkdir(parents=True, exist_ok=True)
        
        try:
            # Download the dataset
            download_dataset(dataset_hash, "my-super-secret", str(dataset_path))
            
            # Verify the file exists and has content
            if not dataset_path.exists():
                raise Exception(f"Downloaded file not found: {dataset_path}")
            
            if dataset_path.stat().st_size == 0:
                raise Exception(f"Downloaded file is empty: {dataset_path}")
                
            logger.info(f"Dataset downloaded successfully to {dataset_path}")
            
        except Exception as e:
            logger.error(f"Failed to download dataset: {str(e)}")
            raise Exception(f"Failed to download dataset: {str(e)}")

        # Load and prepare data
        logger.info(f"Loading dataset from {dataset_path}")
        try:
            df = pd.read_csv(dataset_path)
            if df.empty:
                raise Exception("Dataset is empty after loading")
            logger.info(f"Successfully loaded dataset with {len(df)} rows and {len(df.columns)} columns")
        except Exception as e:
            logger.error(f"Failed to load dataset: {str(e)}")
            raise Exception(f"Failed to load dataset: {str(e)}")
        
        # Use provided features or all columns except target
        if features is None:
            features = [col for col in df.columns if col != target]
        else:
            # Verify all requested features exist in the dataset
            missing_features = [f for f in features if f not in df.columns]
            if missing_features:
                raise Exception(f"Features not found in dataset: {missing_features}")
        
        # Use provided target or last column
        if target is None:
            target = df.columns[-1]
        elif target not in df.columns:
            raise Exception(f"Target column '{target}' not found in dataset")
        
        logger.info(f"Using features: {features}")
        logger.info(f"Using target: {target}")

        X = df[features]
        y = df[target]

        # Train model
        logger.info(f"Training {algorithm} model")
        start_time = time.time()
        
        if algorithm == "linear_regression":
            model = LinearRegression(**params)
            model.fit(X, y)
            
            # Calculate metrics
            y_pred = model.predict(X)
            mse = mean_squared_error(y, y_pred)
            r2 = r2_score(y, y_pred)
            
            metrics = TrainingMetrics(
                accuracy=r2,  # Using R² as accuracy metric for regression
                loss=mse,
                training_time=time.time() - start_time,
                model_size=dataset_path.stat().st_size
            )
            
            logger.info(f"Training completed with R² score: {r2:.4f}, MSE: {mse:.4f}")
        else:
            raise ValueError(f"Unsupported algorithm: {algorithm}")

        # Save model
        model_path = Path("models") / f"{job_id}.joblib"
        model_path.parent.mkdir(parents=True, exist_ok=True)
        joblib.dump(model, model_path)
        logger.info(f"Model saved to {model_path}")

        # Update job status and metrics
        jobs[job_id].update({
            "status": TrainingStatus.COMPLETE,
            "completed_at": datetime.utcnow().isoformat(),
            "metrics": metrics.dict(),
            "model_path": str(model_path)
        })

    except Exception as e:
        logger.error(f"Training failed for job {job_id}: {str(e)}")
        jobs[job_id].update({
            "status": TrainingStatus.FAILED,
            "error": str(e),
            "completed_at": datetime.utcnow().isoformat()
        })
    finally:
        # Clean up dataset file if it exists
        if dataset_path and dataset_path.exists():
            try:
                dataset_path.unlink()
                logger.info(f"Cleaned up dataset file: {dataset_path}")
            except Exception as e:
                logger.error(f"Failed to clean up dataset file: {str(e)}")

def create_job(dataset_hash: str, algorithm: str, params: Dict[str, Any],
               features: Optional[list] = None, target: Optional[str] = None) -> str:
    """Create a new training job."""
    job_id = str(uuid.uuid4())
    jobs[job_id] = {
        "job_id": job_id,  # Add job_id to the job data
        "status": TrainingStatus.PENDING,
        "created_at": datetime.utcnow().isoformat(),
        "dataset_hash": dataset_hash,
        "algorithm": algorithm,
        "params": params,
        "features": features,
        "target": target
    }
    return job_id

def get_job_status(job_id: str) -> Dict[str, Any]:
    """Get the status of a training job."""
    if job_id not in jobs:
        raise ValueError(f"Job {job_id} not found")
    return jobs[job_id]

def get_job_metrics(job_id: str) -> Dict[str, Any]:
    """Get the metrics for a completed training job."""
    job = get_job_status(job_id)
    if job["status"] != TrainingStatus.COMPLETE:
        raise ValueError(f"Job {job_id} is not complete")
    return job["metrics"] 