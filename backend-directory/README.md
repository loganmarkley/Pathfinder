# Pathfinder Backend

## Overview
The backend of the Pathfinder application is responsible for processing requests and providing data to the frontend. This component leverages a generative AI model to analyze transportation options.

## Structure
- **.env**: Contains environment variables for the application
- **.gitignore**: Specifies intentionally untracked files to ignore
- **.gitkeep**: An empty file that keeps track of Git directories
- **requirements.txt**: Lists the Python dependencies required for the backend
- **routlocator.py**: The main script that processes routes and pricing

## Functionalities
- **Route Analysis**: Analyzes transportation routes between two points
- **Pricing Evaluation**: Utilizes AI to determine cost-effective transportation options

## Getting Started
1. Clone the repository
2. Install dependencies from `requirements.txt`
3. Set up environment variables in the `.env` file
4. Run `routlocator.py` to start the backend service