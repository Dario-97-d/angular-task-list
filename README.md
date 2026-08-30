# Task List — Angular Learning Project

A small task-tracking app built to learn Angular fundamentals hands-on, going from an in-memory prototype to a deployed app with a secured backend.

**Live demo:** [https://angular-task-list-dario-97-d.netlify.app](https://angular-task-list-dario-97-d.netlify.app)

## What it does

- Add, complete, and delete tasks
- Filter by All / Active / Completed, with live counts
- Client-side routing to a task detail view
- Form validation on task creation (required, minimum length)
- Data persisted to a real backend, with API credentials kept server-side

## What it demonstrates
- Components, services, and dependency injection
- Reactive state with Angular signals
- Two-way, property, and event binding
- HTTP calls via `HttpClient` and RxJS Observables (`subscribe`)
- Modern `@for`/`@empty` control flow syntax

## Stack

- **Angular** (standalone components, signals, reactive forms, Router)
- **RxJS** (Observables, `catchError`, HTTP error handling)
- **Netlify Functions** — a small Node proxy that forwards requests to the database and injects the API key server-side, so it's never exposed to the browser
- **restdb.io** — hosted REST database (production)
- **json-server** — local mock API for development, avoiding hitting the hosted database during dev

## Architecture

```
Angular app (browser)
      │
      ▼
Netlify Function (/.netlify/functions/tasks)
      │  — attaches API key from server-side env vars
      ▼
restdb.io (prod)  /  json-server (local dev, via netlify dev)
```

The Angular app never talks to the database directly. It calls a Netlify Function, which holds the real API credentials as environment variables and forwards the request. This keeps the API key out of both the git repo and the deployed frontend bundle — a browser inspecting network traffic only ever sees calls to the Netlify Function, never to the database itself.

## Local development

Install dependencies, plus the Netlify CLI (used to run the app and its serverless function together):

```bash
npm install
npm install -g netlify-cli
```

This project uses **json-server v0.x**, not the current major version. v0 supports the `--id` flag, which lets the mock API use `_id` as its key field, matching restdb.io's field naming — later versions changed how ids are generated and dropped that flag. Install it explicitly pinned to v0:

```bash
npm install json-server@0.17.4 --save-dev
```

Run the mock API and the app in **two separate terminals** — both are long-running processes and will block a terminal for as long as they're active:

Terminal 1:
```bash
npx json-server --watch db.json --port 3000 --id _id
```

Terminal 2:
```bash
netlify dev
```

> **Note**: On a fresh start, `netlify dev` can sometimes fail to detect Angular's dev server on port 4200 if Angular hasn't finished starting yet. Running ng serve once beforehand can work around this by allowing Angular to complete its initial compilation and populate its cache.

`netlify dev` runs the Angular dev server and the Netlify Function locally, so the app talks to the function exactly as it would in production — just pointed at the local mock API instead of the hosted database.

Create a local `.env` (gitignored) based on `.env.example`:
```
API_URL=http://localhost:3000/tasks
```

No API key is needed locally since `json-server` doesn't require authentication.

## Deployment

Deployed on Netlify, connected directly to this repo. Build settings live in `netlify.toml`. Production environment variables (`API_URL`, `API_KEY`) are set in the Netlify dashboard, not committed to the repo.

## What I learned

This project was built as a structured, step-by-step learning exercise rather than following a single tutorial, with an emphasis on understanding *why* each piece works the way it does rather than copy-pasting a working app. Notable points along the way:

- **Signals vs. Observables** — when Angular's newer `signal()`/`computed()` state model applies versus RxJS Observables (used by `HttpClient` under the hood), and why both matter since real-world codebases mix older and newer patterns.
- **Dependency Injection** in practice — both constructor injection and the newer `inject()` function.
- **Reactive Forms** over template-driven forms — validation and form state living in the component class rather than scattered across template directives.

## Secrets

- **Keeping secrets out of the client, not just out of git.** The API key is never sent to the browser: it's held as a server-side environment variable and used only inside the Netlify Function, which is the only thing that talks to the database directly. Inspecting network traffic from the deployed app shows calls to the function, never to the database or its key.

## Possible next steps

- Swap the current backend (restdb.io) for a custom .NET Web API, to pair this project with backend/.NET experience
- Add unit tests for `TaskService`
- Add a loading state / skeleton UI while requests are in flight
