# Task List

A small task-tracking app built while learning Angular fundamentals for a .NET + Angular role — standalone components, signals, and HttpClient connected to a REST API.

## Stack
- Angular 21 (standalone components, signals, zoneless)
- json-server (fake REST API for local development)
- Planned: swap json-server for a real .NET Web API backend

## What it demonstrates
- Components, services, and dependency injection
- Reactive state with Angular signals
- Two-way, property, and event binding
- HTTP calls via `HttpClient` and RxJS Observables (`subscribe`)
- Modern `@for`/`@empty` control flow syntax

## Running locally

Start the fake API:
```bash
npm install -g json-server
json-server --watch db.json --port 3000
```

In a separate terminal, start the app:
```bash
npm install
ng serve
```

Open `http://localhost:4200`.

---

This project was generated using [Angular CLI](https://github.com/angular/angular-cli) version 21.2.21.

## Development server
To start a local development server, run:
```bash
ng serve
```
Once the server is running, open your browser and navigate to `http://localhost:4200/`. The application will automatically reload whenever you modify any of the source files.

## Code scaffolding
Angular CLI includes powerful code scaffolding tools. To generate a new component, run:
```bash
ng generate component component-name
```
For a complete list of available schematics (such as `components`, `directives`, or `pipes`), run:
```bash
ng generate --help
```

## Building
To build the project run:
```bash
ng build
```
This will compile your project and store the build artifacts in the `dist/` directory. By default, the production build optimizes your application for performance and speed.

## Running unit tests
To execute unit tests with the [Vitest](https://vitest.dev/) test runner, use the following command:
```bash
ng test
```

## Running end-to-end tests
For end-to-end (e2e) testing, run:
```bash
ng e2e
```
Angular CLI does not come with an end-to-end testing framework by default. You can choose one that suits your needs.

## Additional Resources
For more information on using the Angular CLI, including detailed command references, visit the [Angular CLI Overview and Command Reference](https://angular.dev/tools/cli) page.
