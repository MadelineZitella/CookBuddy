// AI integration — calls local proxy (server.mjs) which forwards to Anthropic API

const PROXY_URL = 'http://localhost:3001/api/claude';

export interface GeneratedRecipe {
  title: string;
  description: string;
  emoji: string;
  cuisine: string;
  cookTime: number;
  difficulty: 'easy' | 'medium' | 'hard';
  ingredients: string[];
  instructions: string[];
  nutrition: {
    calories: number;
    protein: number;
    carbs: number;
    fat: number;
  };
  tags: string[];
  matchedIngredients: string[];
  missingIngredients: string[];
  tip?: string;
}

async function callClaude(system: string, userMessage: string, maxTokens = 2000): Promise<string> {
  const response = await fetch(PROXY_URL, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({
      model: 'claude-haiku-4-5',
      max_tokens: maxTokens,
      system,
      messages: [{ role: 'user', content: userMessage }],
    }),
  });

  if (!response.ok) {
    const err = await response.json().catch(() => ({}));
    throw new Error(`API error ${response.status}: ${JSON.stringify(err)}`);
  }

  const data = await response.json();
  return data.content?.[0]?.text || '';
}

export async function generateRecipes(
  inventoryList: string,
  context: string
): Promise<GeneratedRecipe[]> {
  const system = `You are CookBuddy, an empathetic AI meal planning assistant that helps people overcome decision fatigue.
You specialize in creating personalized, practical recipes using what people already have at home.
Always respond with valid JSON only — no markdown, no code fences, no extra text whatsoever.`;

  const prompt = `Generate exactly 5 creative recipes for a home cook.

INVENTORY: ${inventoryList}

GOAL: ${context}

RULES:
- Prioritize any ingredients expiring soon
- Make each recipe feel distinctly different from the others — vary the cuisine, cooking method, and style
- Keep it practical for weeknight cooking
- Use a warm, encouraging tone in descriptions
- For tags, choose 2-4 that genuinely apply from: high-protein, vegetarian, vegan, healthy, low-carb, dairy-free, gluten-free, quick, one-pot, meal-prep, comfort-food, use-soon

Return a JSON array of exactly 5 objects with this exact shape:
[
  {
    "title": "Recipe Name",
    "description": "2-3 sentences — empathetic and exciting",
    "emoji": "🍜",
    "cuisine": "Thai",
    "cookTime": 25,
    "difficulty": "easy",
    "ingredients": ["2 chicken breasts, diced", "1 cup rice"],
    "instructions": ["Step 1 description", "Step 2 description"],
    "nutrition": { "calories": 420, "protein": 36, "carbs": 38, "fat": 11 },
    "tags": ["high-protein", "vegetarian", "healthy", "low-carb", "dairy-free", "gluten-free", "quick", "one-pot", "meal-prep", "comfort-food", "use-soon"],
    "matchedIngredients": ["Chicken breast", "Rice"],
    "missingIngredients": ["Fish sauce"],
    "tip": "One short chef tip"
  }
]`;

  const text = await callClaude(system, prompt, 6000);
  const cleaned = text.replace(/```json\s*/g, '').replace(/```\s*/g, '').trim();

  try {
    const parsed = JSON.parse(cleaned);
    return Array.isArray(parsed) ? parsed : [parsed];
  } catch {
    const match = cleaned.match(/\[[\s\S]*\]/);
    if (match) return JSON.parse(match[0]);
    throw new Error('Could not parse recipe response from AI');
  }
}

export async function generateCookingHelp(
  recipe: GeneratedRecipe,
  question: string
): Promise<string> {
  const system = `You are CookBuddy, a helpful and friendly cooking assistant.
Answer concisely and practically. Keep responses under 120 words.
Respond in 1-3 conversational sentences, no bullet points.`;

  const prompt = `The user is cooking: ${recipe.title}
Description: ${recipe.description}

Their question: ${question}

Give a helpful, practical, friendly answer.`;

  return callClaude(system, prompt, 300);
}

export async function suggestInventoryItems(currentItems: string[]): Promise<string> {
  const system = `You are a helpful cooking assistant. Give practical, specific advice. Keep it under 80 words, conversational tone.`;

  const prompt = `Someone has these pantry items: ${currentItems.join(', ')}.

Suggest 3 specific ingredients they should pick up that would most expand their recipe options. Be concrete. One short paragraph, friendly tone.`;

  return callClaude(system, prompt, 200);
}
