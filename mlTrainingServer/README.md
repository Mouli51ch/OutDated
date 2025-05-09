# OutDated ML Training Service

A ML training service that enables secure model training on private datasets. This service is part of the OutDated Platform.

## Features

- Secure model training with access control
- Support for multiple ML algorithms
- Asynchronous job processing
- Real-time training status and metrics
- Model storage and retrieval

## Prerequisites

- Python 3.8+
- uv (Python package manager)

## Installation

1. Clone the repository
2. Create and activate a virtual environment:
   ```bash
   python -m venv .venv
   .venv\Scripts\activate  # Windows
   source .venv/bin/activate  # Linux/Mac
   ```
3. Install dependencies using uv:
   ```bash
   uv pip install -e .
   ```

## Running the Service

Start the server:
```bash
python main.py
```

The server will start at `http://localhost:8000`

## API Endpoints

### Get Available Algorithms
```http
GET /available-algorithms
```
Returns a list of available ML algorithms and their parameters.

Response:
```json
{
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
        },
        ...
      }
    },
    ...
  }
}
```

### Start Training
```http
POST /train
```
Start a new ML training job.

Request body:
```json
{
  "dataset_hash": "string",
  "algorithm": "string",
  "params": {
    "param1": "value1",
    "param2": "value2"
  }
}
```

Response:
```json
{
  "job_id": "string",
  "status": "pending",
  "created_at": "2024-03-21T12:00:00Z"
}
```

### Get Training Status
```http
GET /train/{job_id}/status
```
Get the status of a training job.

Response:
```json
{
  "status": "string",
  "created_at": "2024-03-21T12:00:00Z"
}
```

### Get Training Metrics
```http
GET /train/{job_id}/metrics
```
Get training metrics for a completed job.

Response:
```json
{
  "accuracy": 0.95,
  "loss": 0.05,
  "training_time": 120.5,
  "model_size": 1024
}
```

### Get Trained Model
```http
GET /train/{job_id}/model
```
Download the trained model.

Response:
```json
{
  "message": "Model download not implemented yet"
}
```

### Health Check
```http
GET /health
```
Check the service health.

Response:
```json
{
  "status": "healthy",
  "timestamp": "2024-03-21T12:00:00Z"
}
```

## Available Algorithms

### Classification Algorithms
- Random Forest Classifier
- Gradient Boosting Classifier
- Support Vector Machine (SVM)
- Logistic Regression
- K-Nearest Neighbors (KNN)

### Regression Algorithms
- Linear Regression
- Ridge Regression
- Lasso Regression
- Elastic Net
- Support Vector Regression (SVR)

Each algorithm comes with its own set of configurable parameters. Use the `/available-algorithms` endpoint to get detailed information about each algorithm's parameters and their default values.

## Development

### Project Structure
```
mlTrainingServer/
├── src/
│   └── mltrainingserver/
│       ├── __init__.py
│       └── server.py
├── main.py
├── pyproject.toml
├── README.md
└── .gitignore
```

### Adding New Algorithms
To add a new algorithm:
1. Add the algorithm configuration to the `AVAILABLE_ALGORITHMS` dictionary in `server.py`
2. Implement the training logic in the `run_training` function
3. Update the documentation in this README

## License

MIT
