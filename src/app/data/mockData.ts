// Mock data for CookBuddy prototype

export interface Ingredient {
  id: string;
  name: string;
  quantity: string;
  daysUntilExpiry?: number;
  category: 'protein' | 'vegetable' | 'grain' | 'dairy' | 'pantry' | 'other';
}

export interface Recipe {
  id: string;
  title: string;
  description: string;
  cookTime: number; // in minutes
  difficulty: 'easy' | 'medium' | 'hard';
  imageUrl: string;
  ingredients: string[];
  instructions: string[];
  nutrition: {
    calories: number;
    protein: number;
    carbs: number;
    fat: number;
  };
  tags: string[];
  matchedIngredients?: string[];
  missingIngredients?: string[];
}

export const mockInventory: Ingredient[] = [
  { id: '1', name: 'Chicken breast', quantity: '2 pieces', daysUntilExpiry: 2, category: 'protein' },
  { id: '2', name: 'Zucchini', quantity: '1 large', daysUntilExpiry: 3, category: 'vegetable' },
  { id: '3', name: 'Bell pepper', quantity: '2', daysUntilExpiry: 4, category: 'vegetable' },
  { id: '4', name: 'Rice', quantity: '1 cup', category: 'grain' },
  { id: '5', name: 'Eggs', quantity: '6', daysUntilExpiry: 7, category: 'protein' },
  { id: '6', name: 'Spinach', quantity: '1 bunch', daysUntilExpiry: 2, category: 'vegetable' },
  { id: '7', name: 'Garlic', quantity: '1 bulb', category: 'pantry' },
  { id: '8', name: 'Olive oil', quantity: '1 bottle', category: 'pantry' },
  { id: '9', name: 'Soy sauce', quantity: '1 bottle', category: 'pantry' },
  { id: '10', name: 'Ginger', quantity: '1 knob', daysUntilExpiry: 5, category: 'pantry' },
];

export const mockRecipes: Recipe[] = [
  {
    id: '1',
    title: 'Thai Ginger Chicken Bowl',
    description: 'A fresh twist on your usual chicken routine - aromatic ginger and garlic chicken served over rice with sautéed zucchini',
    cookTime: 25,
    difficulty: 'easy',
    imageUrl: 'https://images.unsplash.com/photo-1512058564366-18510be2db19',
    ingredients: [
      '2 chicken breasts, diced',
      '1 zucchini, sliced',
      '1 cup rice',
      '2 cloves garlic, minced',
      '1 inch ginger, grated',
      '2 tbsp soy sauce',
      '1 tbsp olive oil',
      'Salt and pepper to taste'
    ],
    instructions: [
      'Cook rice according to package directions',
      'Heat olive oil in a large pan over medium-high heat',
      'Add minced garlic and grated ginger, sauté for 30 seconds until fragrant',
      'Add diced chicken, season with salt and pepper, cook for 5-7 minutes until golden',
      'Add sliced zucchini and soy sauce, cook for another 4-5 minutes',
      'Serve chicken and vegetables over rice',
      'Optional: garnish with green onions or sesame seeds'
    ],
    nutrition: {
      calories: 425,
      protein: 38,
      carbs: 42,
      fat: 12
    },
    tags: ['quick', 'high-protein', 'use-soon'],
    matchedIngredients: ['Chicken breast', 'Zucchini', 'Rice', 'Garlic', 'Ginger', 'Soy sauce', 'Olive oil'],
    missingIngredients: []
  },
  {
    id: '2',
    title: 'Quick Veggie Stir-Fry',
    description: 'Use up those peppers and spinach before they go bad with this colorful, 15-minute stir-fry',
    cookTime: 15,
    difficulty: 'easy',
    imageUrl: 'https://images.unsplash.com/photo-1512621776951-a57141f2eefd',
    ingredients: [
      '2 bell peppers, sliced',
      '1 bunch spinach',
      '2 cloves garlic, minced',
      '2 tbsp soy sauce',
      '1 tbsp olive oil',
      '1 cup rice',
      'Optional: 2 eggs for protein'
    ],
    instructions: [
      'Cook rice according to package directions',
      'Heat olive oil in a wok or large pan over high heat',
      'Add garlic and stir-fry for 30 seconds',
      'Add bell peppers, cook for 3-4 minutes until slightly softened',
      'Add spinach and soy sauce, cook until spinach wilts (about 2 minutes)',
      'If using eggs: push veggies to the side, scramble eggs in the pan, then mix together',
      'Serve over rice'
    ],
    nutrition: {
      calories: 280,
      protein: 12,
      carbs: 48,
      fat: 6
    },
    tags: ['quick', 'vegetarian', 'use-soon'],
    matchedIngredients: ['Bell pepper', 'Spinach', 'Garlic', 'Soy sauce', 'Olive oil', 'Rice', 'Eggs'],
    missingIngredients: []
  },
  {
    id: '3',
    title: 'Simple Garlic Butter Chicken',
    description: 'A restaurant-quality dish that\'s simpler than you think - perfect for a weeknight when you want something special',
    cookTime: 20,
    difficulty: 'easy',
    imageUrl: 'https://images.unsplash.com/photo-1598103442097-8b74394b95c6',
    ingredients: [
      '2 chicken breasts',
      '3 cloves garlic, minced',
      '2 tbsp butter',
      '1 tbsp olive oil',
      'Fresh herbs (optional)',
      'Salt and pepper to taste'
    ],
    instructions: [
      'Season chicken breasts with salt and pepper on both sides',
      'Heat olive oil in a pan over medium-high heat',
      'Add chicken, cook for 6-7 minutes per side until golden and cooked through',
      'Remove chicken and set aside',
      'In the same pan, add butter and minced garlic',
      'Sauté garlic for 1-2 minutes until fragrant (don\'t burn)',
      'Return chicken to pan, spoon garlic butter over chicken',
      'Serve with rice or vegetables from your fridge'
    ],
    nutrition: {
      calories: 320,
      protein: 42,
      carbs: 2,
      fat: 16
    },
    tags: ['quick', 'high-protein', 'something-different'],
    matchedIngredients: ['Chicken breast', 'Garlic', 'Olive oil'],
    missingIngredients: ['Butter']
  },
  {
    id: '4',
    title: 'Spinach & Egg Breakfast Bowl',
    description: 'Start your day with protein and greens - a simple, satisfying breakfast that takes minutes',
    cookTime: 10,
    difficulty: 'easy',
    imageUrl: 'https://images.unsplash.com/photo-1525351484163-7529414344d8',
    ingredients: [
      '2-3 eggs',
      '1 cup spinach',
      '1 clove garlic, minced',
      '1 tbsp olive oil',
      'Salt and pepper to taste',
      'Optional: toast or rice'
    ],
    instructions: [
      'Heat olive oil in a pan over medium heat',
      'Add minced garlic, sauté for 30 seconds',
      'Add spinach and cook until wilted (about 2 minutes)',
      'Push spinach to the side, crack eggs into the pan',
      'Cook eggs to your preference (fried, scrambled, or poached)',
      'Season with salt and pepper',
      'Serve over toast or rice if desired'
    ],
    nutrition: {
      calories: 220,
      protein: 18,
      carbs: 6,
      fat: 14
    },
    tags: ['quick', 'breakfast', 'high-protein'],
    matchedIngredients: ['Eggs', 'Spinach', 'Garlic', 'Olive oil'],
    missingIngredients: []
  },
  {
    id: '5',
    title: 'Grilled Chicken with Roasted Veggies',
    description: 'A satisfying, balanced meal that makes the most of what you have - minimal cleanup, maximum flavor',
    cookTime: 30,
    difficulty: 'easy',
    imageUrl: 'https://images.unsplash.com/photo-1762631383362-bad467f94a8d?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxyb2FzdGVkJTIwY2hpY2tlbiUyMHZlZ2V0YWJsZXMlMjBkaW5uZXJ8ZW58MXx8fHwxNzczODUyMTAwfDA&ixlib=rb-4.1.0&q=80&w=1080',
    ingredients: [
      '2 chicken breasts',
      '1 zucchini, chopped',
      '2 bell peppers, chopped',
      '2 cloves garlic, minced',
      '2 tbsp olive oil',
      'Salt, pepper, and herbs to taste'
    ],
    instructions: [
      'Preheat oven to 425°F (220°C)',
      'Chop zucchini and bell peppers into bite-sized pieces',
      'Toss vegetables with 1 tbsp olive oil, minced garlic, salt, and pepper',
      'Spread vegetables on a baking sheet',
      'Season chicken breasts with salt, pepper, and herbs',
      'Heat remaining olive oil in an oven-safe pan, sear chicken for 2-3 minutes per side',
      'Transfer pan to oven along with the vegetable sheet',
      'Bake for 15-18 minutes until chicken is cooked through',
      'Let chicken rest for 5 minutes before serving with roasted vegetables'
    ],
    nutrition: {
      calories: 380,
      protein: 40,
      carbs: 18,
      fat: 16
    },
    tags: ['high-protein', 'use-soon', 'something-different'],
    matchedIngredients: ['Chicken breast', 'Zucchini', 'Bell pepper', 'Garlic', 'Olive oil'],
    missingIngredients: []
  }
];

// Helper function to get recipes by tag
export function getRecipesByTag(tag: string): Recipe[] {
  return mockRecipes.filter(recipe => recipe.tags.includes(tag));
}

// Helper function to get recipe by ID
export function getRecipeById(id: string): Recipe | undefined {
  return mockRecipes.find(recipe => recipe.id === id);
}