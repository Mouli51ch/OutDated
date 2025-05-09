"""
API module for ML training service.
"""
from fastapi import FastAPI, HTTPException, BackgroundTasks
from fastapi.middleware.cors import CORSMiddleware
from datetime import datetime
from typing import Dict, Any, List
import logging
import threading
import traceback
from fastapi.responses import FileResponse
from pathlib import Path

from .models import (
    TrainingRequest,
    TrainingResponse,
    TrainingMetrics,
    AvailableAlgorithms,
    TrainingStatus,
    AlgorithmInfo,
    AlgorithmParameter
)
from .algorithms import AVAILABLE_ALGORITHMS
from .training import (
    validate_access,
    run_training,
    create_job,
    get_job_status,
    get_job_metrics
)

# Configure logging
logging.basicConfig(
    level=logging.INFO,
    format='%(asctime)s - %(name)s - %(levelname)s - %(message)s'
)
logger = logging.getLogger(__name__)

app = FastAPI(
    title="ML Training Service",
    description="A FastAPI-based service for secure ML model training.",
    version="1.0.0",
    docs_url="/docs",
    redoc_url="/redoc",
    openapi_url="/openapi.json",
    openapi_tags=[
        {
            "name": "algorithms",
            "description": "Operations with ML algorithms",
        },
        {
            "name": "training",
            "description": "ML model training operations",
        },
        {
            "name": "system",
            "description": "System operations",
        },
    ],
)

# Add CORS middleware
app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],  # In production, replace with specific origins
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

# Available algorithms
ALGORITHMS = {
    "linear_regression": AlgorithmInfo(
        name="Linear Regression",
        description="A linear approach to modeling the relationship between a dependent variable and one or more independent variables",
        type="regression",
        parameters={
            "fit_intercept": AlgorithmParameter(
                type="bool",
                default=True,
                description="Whether to calculate the intercept for this model"
            ),
            "normalize": AlgorithmParameter(
                type="bool",
                default=False,
                description="Whether to normalize the features"
            )
        }
    )
}

@app.get(
    "/algorithms",
    response_model=AvailableAlgorithms,
    tags=["algorithms"],
    summary="Get available algorithms",
    description="Returns a list of all available ML algorithms and their parameters.",
    response_description="A dictionary of available algorithms with their parameters and descriptions."
)
async def get_algorithms():
    """
    Get a list of available algorithms and their parameters.
    
    Returns:
        AvailableAlgorithms: A dictionary containing all available algorithms,
        their descriptions, types, and configurable parameters.
    """
    return {"algorithms": ALGORITHMS}

@app.post(
    "/train",
    response_model=TrainingResponse,
    tags=["training"],
    summary="Start training job",
    description="Start a new ML training job with the specified algorithm and parameters.",
    response_description="Job ID and initial status of the training job."
)
async def start_training(request: TrainingRequest, background_tasks: BackgroundTasks) -> Dict[str, Any]:
    """
    Start a new training job.
    """
    try:
        logger.info(f"Received training request: {request.dict()}")
        
        # Validate dataset access
        if not validate_access(request.dataset_hash):
            logger.error(f"Access denied for dataset: {request.dataset_hash}")
            raise HTTPException(status_code=403, detail="Access to dataset denied")
        
        # Create the job
        try:
            job_id = create_job(
                dataset_hash=request.dataset_hash,
                algorithm=request.algorithm,
                params=request.params,
                features=request.features,
                target=request.target
            )
            logger.info(f"Created job with ID: {job_id}")
        except Exception as e:
            logger.error(f"Failed to create job: {str(e)}")
            logger.error(traceback.format_exc())
            raise HTTPException(status_code=500, detail=f"Failed to create job: {str(e)}")
        
        # Start training in background
        def run_training_task():
            try:
                logger.info(f"Starting training for job {job_id}")
                run_training(
                    job_id=job_id,
                    dataset_hash=request.dataset_hash,
                    algorithm=request.algorithm,
                    params=request.params,
                    features=request.features,
                    target=request.target
                )
                logger.info(f"Training completed for job {job_id}")
            except Exception as e:
                logger.error(f"Background training failed for job {job_id}: {str(e)}")
                logger.error(traceback.format_exc())
        
        # Start the training in a separate thread
        thread = threading.Thread(target=run_training_task)
        thread.daemon = True
        thread.start()
        logger.info(f"Started background training thread for job {job_id}")
        
        # Return the job information
        return get_job_status(job_id)
        
    except HTTPException:
        raise
    except Exception as e:
        logger.error(f"Unexpected error in start_training: {str(e)}")
        logger.error(traceback.format_exc())
        raise HTTPException(status_code=500, detail=f"Internal server error: {str(e)}")

@app.get(
    "/train/{job_id}/status",
    tags=["training"],
    summary="Get training status",
    description="Get the current status of a training job.",
    response_description="Current status and creation time of the training job."
)
async def check_job_status(job_id: str) -> Dict[str, Any]:
    """
    Get the status of a training job.
    """
    try:
        return get_job_status(job_id)
    except ValueError as e:
        raise HTTPException(status_code=404, detail=str(e))
    except Exception as e:
        logger.error(f"Error checking job status: {str(e)}")
        logger.error(traceback.format_exc())
        raise HTTPException(status_code=500, detail=str(e))

@app.get(
    "/train/{job_id}/metrics",
    response_model=TrainingMetrics,
    tags=["training"],
    summary="Get training metrics",
    description="Get training metrics for a completed job.",
    response_description="Training metrics including accuracy, loss, training time, and model size."
)
async def get_job_metrics_endpoint(job_id: str) -> Dict[str, Any]:
    """
    Get the metrics for a completed training job.
    """
    try:
        return get_job_metrics(job_id)
    except ValueError as e:
        raise HTTPException(status_code=404, detail=str(e))
    except Exception as e:
        logger.error(f"Error getting job metrics: {str(e)}")
        logger.error(traceback.format_exc())
        raise HTTPException(status_code=500, detail=str(e))

@app.get(
    "/train/{job_id}/model",
    tags=["training"],
    summary="Get trained model",
    description="Download the trained model for a completed job.",
    response_description="The trained model file or a message indicating the model is not available."
)
async def download_model(job_id: str):
    """
    Download the trained model.
    
    Args:
        job_id (str): The ID of the training job.
    
    Returns:
        FileResponse: The trained model file.
    
    Raises:
        HTTPException: If the job is not found or not complete.
    """
    try:
        # Get job status to check if training is complete
        job_status = get_job_status(job_id)
        
        if job_status["status"] != TrainingStatus.COMPLETE:
            raise HTTPException(
                status_code=400,
                detail=f"Model not ready. Current status: {job_status['status']}"
            )
        
        # Get model path from job status
        model_path = Path(job_status.get("model_path"))
        if not model_path or not model_path.exists():
            raise HTTPException(
                status_code=404,
                detail="Model file not found"
            )
        
        # Return the model file
        return FileResponse(
            path=str(model_path),
            filename=f"model_{job_id}.joblib",
            media_type="application/octet-stream"
        )
        
    except HTTPException:
        raise
    except Exception as e:
        logger.error(f"Error in download_model: {str(e)}")
        logger.error(traceback.format_exc())
        raise HTTPException(status_code=500, detail=str(e))

@app.get(
    "/health",
    tags=["system"],
    summary="Health check",
    description="Check the health status of the service.",
    response_description="Current health status and timestamp."
)
async def health_check() -> Dict[str, str]:
    """
    Health check endpoint.
    """
    return {"status": "healthy"} 