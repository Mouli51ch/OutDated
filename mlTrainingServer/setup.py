from setuptools import setup, find_packages

setup(
    name="mltrainingserver",
    version="1.0.0",
    packages=find_packages(where="src"),
    package_dir={"": "src"},
    install_requires=[
        "fastapi",
        "uvicorn",
        "pandas",
        "scikit-learn",
        "joblib",
        "pycryptodome",
    ],
    python_requires=">=3.8",
) 