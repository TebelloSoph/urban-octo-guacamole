# Gemini Code Assistant Context

This document provides context for the Gemini Code Assistant to understand the Chessly project.

## Project Overview

Chessly is a web application built with Angular. The project was generated with the Angular CLI, and it follows the standard project structure. Based on the name, it is likely a chess application.

The project uses the following main technologies:

*   **Angular:** A TypeScript-based web application framework.
*   **TypeScript:** A typed superset of JavaScript.
*   **SCSS:** A CSS preprocessor.
*   **Genkit:** The `.genkit` directory suggests that Genkit is being used for AI features.
*   **Firebase:** The `firebase-debug.log` suggests that Firebase is being used for backend services.

The application is structured as a single-page application (SPA) with a root component (`app.ts`) that uses a router outlet to display different views. Currently, no routes are defined in `app.routes.ts`.

## Building and Running

The following scripts are available in `package.json` to build, run, and test the application:

*   **`npm start`:** Starts a local development server. The application will be available at `http://localhost:4200/`.
*   **`npm run build`:** Builds the application for production. The build artifacts will be stored in the `dist/` directory.
*   **`npm test`:** Runs the unit tests using Karma.

## Development Conventions

*   **Code Style:** The project uses Prettier for code formatting. The configuration is defined in `package.json`.
*   **Components:** Components are generated using the Angular CLI. The default style is SCSS.
*   **State Management:** The root component uses Angular Signals for state management (`title = signal('chessly')`).
*   **Routing:** The application is set up for routing, but no routes are currently defined.
