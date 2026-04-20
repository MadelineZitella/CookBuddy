
  # CookBuddy application


### 1. Clone the repo and install dependencies

```bash
npm install
```

Then install the proxy server dependencies:

```bash
npm install express cors dotenv
```

### 2. Start the proxy server

The app routes AI requests through a local proxy to avoid browser CORS restrictions. Open a terminal and run:

```bash
node server.mjs
```

You should see:
```
✅ API key loaded (starts with: sk-ant-api03...)
🚀 CookBuddy proxy running at http://localhost:3001
```

Keep this terminal running.

### 4. Start the app

Open a **second terminal** and run:

```bash
npm run dev
```

Then open your browser to **http://localhost:5173**
