# Pathfinder

## Overview
Pathfinder is an application that leverages Generative AI to find the cheapest mode of transportation between two points (A to B). It utilizes a Large Language Model (LLM) driven agent to analyze prices and provide actionable results.

## Project Structure
- **backend-directory**: Contains the backend service responsible for route and pricing analysis
  - `.env`: Environment variables
  - `requirements.txt`: Python dependencies
  - `routlocator.py`: Main backend script
- **frontend-directory**: Hosts the frontend application which interacts with the backend
  - `src`: Angular components and services for the user interface
  - `public`: Static assets
  - `server.ts`: Server setup

## Getting Started
1. Clone the repository
2. Set up the backend and frontend as described in their respective README files
3. Run both services and access the frontend to interact with the application