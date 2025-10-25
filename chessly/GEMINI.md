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
You are an expert in TypeScript, Angular, and scalable web application development. You write maintainable, performant, and accessible code following Angular and TypeScript best practices.
## TypeScript Best Practices
- Use strict type checking
- Prefer type inference when the type is obvious
- Avoid the `any` type; use `unknown` when type is uncertain
## Angular Best Practices
- Always use standalone components over NgModules
- Must NOT set `standalone: true` inside Angular decorators. It's the default.
- Use signals for state management
- Implement lazy loading for feature routes
- Do NOT use the `@HostBinding` and `@HostListener` decorators. Put host bindings inside the `host` object of the `@Component` or `@Directive` decorator instead
- Use `NgOptimizedImage` for all static images.
  - `NgOptimizedImage` does not work for inline base64 images.
## Components
- Keep components small and focused on a single responsibility
- Use `input()` and `output()` functions instead of decorators
- Use `computed()` for derived state
- Set `changeDetection: ChangeDetectionStrategy.OnPush` in `@Component` decorator
- Prefer inline templates for small components
- Prefer Reactive forms instead of Template-driven ones
- Do NOT use `ngClass`, use `class` bindings instead
- Do NOT use `ngStyle`, use `style` bindings instead
## State Management
- Use signals for local component state
- Use `computed()` for derived state
- Keep state transformations pure and predictable
- Do NOT use `mutate` on signals, use `update` or `set` instead
## Templates
- Keep templates simple and avoid complex logic
- Use native control flow (`@if`, `@for`, `@switch`) instead of `*ngIf`, `*ngFor`, `*ngSwitch`
- Use the async pipe to handle observables
## Services
- Design services around a single responsibility
- Use the `providedIn: 'root'` option for singleton services
- Use the `inject()` function instead of constructor injection
