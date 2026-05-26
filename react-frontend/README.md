# React Dashboard App

A simple React app that shows Pipelines, Services, and Team data in a tabbed dark-themed UI.

---

## Project Structure

```
react-frontend/
├── public/
│   └── index.html
├── src/
│   ├── App.js
│   ├── App.css
│   └── index.js
├── .env
└── package.json
```

---

## Requirements

Make sure you have installed:

- [Node.js](https://nodejs.org/) v16 or above
- npm (comes with Node.js)

Check your versions:

```bash
node -v
npm -v
```

---

## How to Run

### Step 1 — Go to the project folder

```bash
cd react-frontend
```

### Step 2 — Install dependencies

```bash
npm install
```

### Step 3 — Start the app

```bash
npm start
```

App will open at: **http://localhost:3000**

---

## Available Scripts

| Command           | What it does                        |
|-------------------|-------------------------------------|
| `npm install`     | Installs all dependencies           |
| `npm start`       | Starts the app on localhost:3000    |
| `npm run build`   | Builds the app for production       |

---

## Common Errors & Fixes

**npm cannot be loaded — scripts disabled**

Run this in PowerShell once:
```
Set-ExecutionPolicy -Scope CurrentUser -ExecutionPolicy RemoteSigned -Force
```

**Port 3000 already in use**

Open `.env` and change the port:
```
PORT=3001
```

**Blank screen or API errors**

Make sure the Flask backend is running on port 5000:
```bash
cd ..
python app.py
```
