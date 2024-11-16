# Pathfinder Frontend

This project was generated with [Angular CLI](https://github.com/angular/angular-cli) version 18.2.9.

## Overview
The frontend of the Pathfinder application provides users with a graphical interface to interact with the backend service and display route information.

## Getting Started:
1. Make sure you have the latest LTS version of Node (I recommend using the nvm package manager)
2. In a terminal, run `npm install -g @angular/cli`
3. Then, in the frontend directory, run `npm install` to install all dependencies
3. Finally, run `ng serve` to run the dev server and navigate to `http://localhost:4200/`. 

The application will automatically reload if you change any of the source files.

## Structure
- **.angular**: Configuration and files related to Angular framework
- **node_modules**: Contains all JavaScript dependencies installed
- **public**: Static files served by the application
- **src**: The source directory for Angular components and services
- **.editorconfig**: Ensures consistent coding styles between different editors and IDEs
- **.gitignore**: Specifies files to ignore in Git
- **angular.json**: Configuration file for the Angular project
- **package-lock.json**: Locks the versions of dependencies
- **package.json**: Contains metadata about the project and dependencies
- **README.md**: Documentation for the frontend
- **server.ts**: Sets up the server for the frontend application
- **tsconfig.*.json**: TypeScript configuration files

## Functionalities
- **User Interface**: A user-friendly interface to input route data
- **Dynamic Pricing Display**: Showcases pricing and route suggestions fetched from the backend