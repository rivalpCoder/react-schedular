# DevOps Dashboard — React Frontend

A React-based dashboard that displays real-time DevOps data — CI/CD pipelines, running services, and team members — fetched from a Flask backend API.

---

## Project Structure

```
react-frontend/
├── public/
│   └── index.html          # HTML entry point
├── src/
│   ├── App.js              # Main component with all UI logic
│   ├── App.css             # Dark theme styles
│   └── index.js            # React DOM render entry
├── .env                    # Port config (PORT=3000)
└── package.json            # Dependencies and proxy config
```

---

## Features

- **Pipelines Tab** — shows CI/CD pipeline name, branch, status, duration, and who triggered it
- **Services Tab** — shows service name, environment, health status, uptime, and region
- **Team Tab** — shows team member name, role, email, and tools they use
- **Status Badges** — color-coded badges (green = healthy/success, red = failed/down, yellow = degraded)
- **Loading & Error States** — handles API loading and failure gracefully

---

## Tech Stack

| Technology     | Version  | Purpose                  |
|----------------|----------|--------------------------|
| React          | 18.2.0   | UI framework             |
| React DOM      | 18.2.0   | DOM rendering            |
| React Scripts  | 5.0.1    | Dev server & build tool  |
| Flask (backend)| -        | REST API data source     |

---

## Prerequisites

Make sure you have these installed:

- [Node.js](https://nodejs.org/) (v16 or above)
- [Python](https://www.python.org/) (v3.8 or above)
- npm (comes with Node.js)

---

## Getting Started

### 1. Start the Flask Backend

The React app fetches data from the Flask API running on port `5000`. Start it first.

```bash
cd devops-website
python app.py
```

Flask will start at: `http://localhost:5000`

### 2. Install React Dependencies

```bash
cd devops-website/react-frontend
npm install
```

### 3. Start the React App

```bash
npm start
```

React will start at: `http://localhost:3000`

---

## API Endpoints Used

| Endpoint         | Data Returned         |
|------------------|-----------------------|
| `/api/pipelines` | List of CI/CD pipelines |
| `/api/services`  | List of running services |
| `/api/team`      | List of team members  |

> The `proxy` field in `package.json` is set to `http://127.0.0.1:5000`, so all `/api/*` requests are automatically forwarded to Flask — no CORS setup needed.

---

## Available Scripts

| Command         | Description                        |
|-----------------|------------------------------------|
| `npm start`     | Runs the app in development mode   |
| `npm run build` | Builds the app for production      |

---

## Status Badge Colors

| Status    | Color  |
|-----------|--------|
| success   | Green  |
| healthy   | Green  |
| running   | Blue   |
| pending   | Yellow |
| degraded  | Yellow |
| failed    | Red    |
| down      | Red    |

---

## Common Issues

**ECONNREFUSED error in browser console**
- Flask backend is not running. Start it with `python app.py` first.

**npm cannot be loaded (PowerShell scripts disabled)**
- Run this once in PowerShell as admin:
  ```
  Set-ExecutionPolicy -Scope CurrentUser -ExecutionPolicy RemoteSigned -Force
  ```

**Port 3000 already in use**
- Change the port in `react-frontend/.env`:
  ```
  PORT=3001
  ```
