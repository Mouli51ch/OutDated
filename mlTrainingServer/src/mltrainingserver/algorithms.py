AVAILABLE_ALGORITHMS = {
    # Classification Algorithms
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
            "max_depth": {
                "type": "int",
                "default": None,
                "description": "Maximum depth of the tree"
            },
            "min_samples_split": {
                "type": "int",
                "default": 2,
                "description": "Minimum number of samples required to split an internal node"
            },
            "criterion": {
                "type": "str",
                "default": "gini",
                "description": "Function to measure the quality of a split",
                "options": ["gini", "entropy", "log_loss"]
            }
        }
    },
    "gradient_boosting": {
        "name": "Gradient Boosting Classifier",
        "description": "A machine learning technique for classification problems",
        "type": "classification",
        "parameters": {
            "n_estimators": {
                "type": "int",
                "default": 100,
                "description": "Number of boosting stages"
            },
            "learning_rate": {
                "type": "float",
                "default": 0.1,
                "description": "Learning rate shrinks the contribution of each tree"
            },
            "max_depth": {
                "type": "int",
                "default": 3,
                "description": "Maximum depth of the individual regression estimators"
            },
            "loss": {
                "type": "str",
                "default": "log_loss",
                "description": "Loss function to be optimized",
                "options": ["log_loss", "exponential"]
            }
        }
    },
    "svm": {
        "name": "Support Vector Machine",
        "description": "A supervised learning model for classification",
        "type": "classification",
        "parameters": {
            "C": {
                "type": "float",
                "default": 1.0,
                "description": "Regularization parameter"
            },
            "kernel": {
                "type": "str",
                "default": "rbf",
                "description": "Specifies the kernel type to be used in the algorithm",
                "options": ["linear", "poly", "rbf", "sigmoid"]
            },
            "gamma": {
                "type": "str",
                "default": "scale",
                "description": "Kernel coefficient",
                "options": ["scale", "auto"]
            }
        }
    },
    "logistic_regression": {
        "name": "Logistic Regression",
        "description": "A linear model for classification",
        "type": "classification",
        "parameters": {
            "C": {
                "type": "float",
                "default": 1.0,
                "description": "Inverse of regularization strength"
            },
            "solver": {
                "type": "str",
                "default": "lbfgs",
                "description": "Algorithm to use in the optimization problem",
                "options": ["newton-cg", "lbfgs", "liblinear", "sag", "saga"]
            },
            "max_iter": {
                "type": "int",
                "default": 100,
                "description": "Maximum number of iterations"
            }
        }
    },
    "knn": {
        "name": "K-Nearest Neighbors",
        "description": "A non-parametric classification method",
        "type": "classification",
        "parameters": {
            "n_neighbors": {
                "type": "int",
                "default": 5,
                "description": "Number of neighbors to use"
            },
            "weights": {
                "type": "str",
                "default": "uniform",
                "description": "Weight function used in prediction",
                "options": ["uniform", "distance"]
            },
            "algorithm": {
                "type": "str",
                "default": "auto",
                "description": "Algorithm used to compute the nearest neighbors",
                "options": ["auto", "ball_tree", "kd_tree", "brute"]
            }
        }
    },
    # Regression Algorithms
    "linear_regression": {
        "name": "Linear Regression",
        "description": "A linear approach to modeling the relationship between variables",
        "type": "regression",
        "parameters": {
            "fit_intercept": {
                "type": "bool",
                "default": True,
                "description": "Whether to calculate the intercept for this model"
            },
            "n_jobs": {
                "type": "int",
                "default": None,
                "description": "Number of jobs to use for the computation"
            }
        }
    },
    "ridge": {
        "name": "Ridge Regression",
        "description": "Linear least squares with l2 regularization",
        "type": "regression",
        "parameters": {
            "alpha": {
                "type": "float",
                "default": 1.0,
                "description": "Regularization strength"
            },
            "fit_intercept": {
                "type": "bool",
                "default": True,
                "description": "Whether to calculate the intercept for this model"
            },
            "solver": {
                "type": "str",
                "default": "auto",
                "description": "Solver to use in the computational routines",
                "options": ["auto", "svd", "cholesky", "lsqr", "sparse_cg", "sag", "saga"]
            }
        }
    },
    "lasso": {
        "name": "Lasso Regression",
        "description": "Linear Model trained with L1 prior as regularizer",
        "type": "regression",
        "parameters": {
            "alpha": {
                "type": "float",
                "default": 1.0,
                "description": "Constant that multiplies the L1 term"
            },
            "fit_intercept": {
                "type": "bool",
                "default": True,
                "description": "Whether to calculate the intercept for this model"
            },
            "selection": {
                "type": "str",
                "default": "cyclic",
                "description": "If set to 'random', a random coefficient is updated every iteration",
                "options": ["cyclic", "random"]
            }
        }
    },
    "elastic_net": {
        "name": "Elastic Net",
        "description": "Linear regression with combined L1 and L2 priors as regularizer",
        "type": "regression",
        "parameters": {
            "alpha": {
                "type": "float",
                "default": 1.0,
                "description": "Constant that multiplies the penalty terms"
            },
            "l1_ratio": {
                "type": "float",
                "default": 0.5,
                "description": "Mixing parameter"
            },
            "fit_intercept": {
                "type": "bool",
                "default": True,
                "description": "Whether to calculate the intercept for this model"
            }
        }
    },
    "svr": {
        "name": "Support Vector Regression",
        "description": "Support Vector Machine for regression",
        "type": "regression",
        "parameters": {
            "C": {
                "type": "float",
                "default": 1.0,
                "description": "Regularization parameter"
            },
            "kernel": {
                "type": "str",
                "default": "rbf",
                "description": "Specifies the kernel type to be used in the algorithm",
                "options": ["linear", "poly", "rbf", "sigmoid"]
            },
            "epsilon": {
                "type": "float",
                "default": 0.1,
                "description": "Epsilon in the epsilon-SVR model"
            }
        }
    }
} 