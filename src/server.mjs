import { config } from 'dotenv';
import express from 'express';
import cors from 'cors';

// Load .env file
config();

const app = express();
const PORT = 3001;

const apiKey = process.env.ANTHROPIC_API_KEY;

if (!apiKey) {
  console.error('❌ ANTHROPIC_API_KEY is not set! Check your .env file.');
  process.exit(1);
} else {
  console.log(`✅ API key loaded (starts with: ${apiKey.slice(0, 12)}...)`);
}

app.use(cors({ origin: 'http://localhost:5173' }));
app.use(express.json());

app.post('/api/claude', async (req, res) => {
  try {
    const response = await fetch('https://api.anthropic.com/v1/messages', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'x-api-key': apiKey,
        'anthropic-version': '2023-06-01',
      },
      body: JSON.stringify(req.body),
    });

    const data = await response.json();

    if (!response.ok) {
      console.error('Anthropic API error:', data);
      return res.status(response.status).json(data);
    }

    res.json(data);
  } catch (err) {
    console.error('Proxy error:', err);
    res.status(500).json({ error: 'Proxy server error' });
  }
});

app.listen(PORT, () => {
  console.log(`🚀 CookBuddy proxy running at http://localhost:${PORT}`);
});
