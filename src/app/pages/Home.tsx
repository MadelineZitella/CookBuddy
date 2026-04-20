import { useState } from 'react';
import { useNavigate } from 'react-router';
import { ChefHat, Clock, Sparkles, AlertCircle, RefreshCw, ShoppingBasket } from 'lucide-react';
import { Button } from '../components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '../components/ui/card';
import { Badge } from '../components/ui/badge';
import { mockInventory } from '../data/mockData';
import { generateRecipes, type GeneratedRecipe } from '../lib/ai';

const CATEGORY_CONFIG = {
  quick: {
    label: 'Quick Dinner',
    description: 'Need something fast? Meals ready in 20 minutes or less',
    icon: Clock,
    prompt: 'quick weeknight dinner under 20 minutes',
    bgClass: 'bg-blue-50 hover:bg-blue-100',
    borderClass: 'border-blue-200 hover:border-blue-400',
    iconBg: 'bg-blue-100',
    iconColor: 'text-blue-600',
  },
  'use-soon': {
    label: 'Use These Soon',
    description: "Let's cook with what's about to expire",
    icon: AlertCircle,
    prompt: 'use expiring ingredients, prevent food waste',
    bgClass: 'bg-orange-50 hover:bg-orange-100',
    borderClass: 'border-orange-200 hover:border-orange-400',
    iconBg: 'bg-orange-100',
    iconColor: 'text-orange-600',
  },
  'something-different': {
    label: 'Something Different',
    description: 'Tired of the same meals? Try a fresh twist',
    icon: Sparkles,
    prompt: 'creative and unique recipe, something different and exciting',
    bgClass: 'bg-purple-50 hover:bg-purple-100',
    borderClass: 'border-purple-200 hover:border-purple-400',
    iconBg: 'bg-purple-100',
    iconColor: 'text-purple-600',
  },
};

// Ensure no duplicate emojis across a batch — assign fallbacks if needed
const FALLBACK_EMOJIS = ['🍱','🥘','🫕','🥗','🍲','🥙','🌮','🍝','🥩','🍛','🫔','🥚'];

function deduplicateEmojis(recipes: GeneratedRecipe[]): GeneratedRecipe[] {
  const seen = new Set<string>();
  return recipes.map((r, i) => {
    let emoji = r.emoji || '🍽️';
    if (seen.has(emoji)) {
      // pick a fallback not yet used
      const fallback = FALLBACK_EMOJIS.find(e => !seen.has(e)) ?? ['🍽️','🥄','🍴','🫙','🧂'][i % 5];
      emoji = fallback;
    }
    seen.add(emoji);
    return { ...r, emoji };
  });
}

// Maps tag values to colors and display labels
function getTagStyle(tag: string): string {
  const t = tag.toLowerCase().replace(/[\s-]/g, '');
  if (t === 'highprotein')       return 'bg-blue-100 text-blue-700';
  if (t === 'vegetarian')        return 'bg-green-100 text-green-700';
  if (t === 'vegan')             return 'bg-emerald-100 text-emerald-700';
  if (t === 'healthy')           return 'bg-teal-100 text-teal-700';
  if (t === 'lowcarb')           return 'bg-violet-100 text-violet-700';
  if (t === 'dairyfree')         return 'bg-sky-100 text-sky-700';
  if (t === 'glutenfree')        return 'bg-amber-100 text-amber-700';
  if (t === 'quick' || t === '30min' || t === '20min') return 'bg-yellow-100 text-yellow-700';
  if (t === 'onepot' || t === 'onepan') return 'bg-orange-100 text-orange-700';
  if (t === 'usesoon' || t === 'useexpiring') return 'bg-red-100 text-red-700';
  if (t === 'comfortfood')       return 'bg-rose-100 text-rose-700';
  if (t === 'mealprep')         return 'bg-indigo-100 text-indigo-700';
  return 'bg-gray-100 text-gray-600'; // default
}

function formatTag(tag: string): string {
  // Convert snake_case, kebab-case, or camelCase to readable labels
  return tag
    .replace(/[-_]/g, ' ')
    .replace(/([a-z])([A-Z])/g, '$1 $2')
    .replace(/\b\w/g, c => c.toUpperCase())
    .trim();
}

export function Home() {
  const navigate = useNavigate();
  const [selectedCategory, setSelectedCategory] = useState<string | null>(null);
  const [recipes, setRecipes] = useState<GeneratedRecipe[]>([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const expiringItems = mockInventory.filter(item =>
    item.daysUntilExpiry && item.daysUntilExpiry <= 3
  );

  const handleCategorySelect = async (category: string) => {
    setSelectedCategory(category);
    setRecipes([]);
    setError(null);
    setLoading(true);

    const config = CATEGORY_CONFIG[category as keyof typeof CATEGORY_CONFIG];
    const inventoryList = mockInventory
      .map(i => `${i.name} (${i.quantity}${i.daysUntilExpiry ? `, expires in ${i.daysUntilExpiry} days` : ''})`)
      .join(', ');

    try {
      const generated = await generateRecipes(inventoryList, config.prompt);
      setRecipes(deduplicateEmojis(generated));
    } catch {
      setError('Could not generate recipes. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  const handleRecipeClick = (recipe: GeneratedRecipe) => {
    sessionStorage.setItem('currentRecipe', JSON.stringify(recipe));
    navigate(`/recipe/ai-${Date.now()}`);
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-orange-50 via-white to-green-50">
      {/* Header */}
      <header className="border-b bg-white/80 backdrop-blur-sm sticky top-0 z-10">
        <div className="container mx-auto px-4 py-4 flex items-center justify-between">
          <div className="flex items-center gap-2">
            <ChefHat className="size-8 text-orange-600" />
            <h1 className="text-2xl font-bold text-gray-900">CookBuddy</h1>
            <Badge variant="secondary" className="ml-1 text-xs bg-orange-100 text-orange-700">AI</Badge>
          </div>
          <Button variant="outline" onClick={() => navigate('/inventory')}>
            <ShoppingBasket className="size-4 mr-2" />
            My Inventory
          </Button>
        </div>
      </header>

      <main className="container mx-auto px-4 py-8 max-w-4xl">
        {/* Welcome */}
        <div className="mb-8">
          <h2 className="text-3xl font-bold text-gray-900 mb-2">What are you feeling tonight?</h2>
          <p className="text-gray-600">Let's find something delicious without the decision fatigue — powered by AI</p>
        </div>

        {/* Expiring Alert */}
        {expiringItems.length > 0 && (
          <Card className="mb-6 border-orange-200 bg-orange-50">
            <CardHeader className="pb-3">
              <div className="flex items-start gap-3">
                <AlertCircle className="size-5 text-orange-600 mt-0.5" />
                <div className="flex-1">
                  <CardTitle className="text-lg">Use Soon</CardTitle>
                  <CardDescription>These ingredients are expiring in the next few days:</CardDescription>
                </div>
              </div>
            </CardHeader>
            <CardContent>
              <div className="flex flex-wrap gap-2">
                {expiringItems.map(item => (
                  <Badge key={item.id} variant="secondary" className="bg-orange-100">
                    {item.name} ({item.daysUntilExpiry} day{item.daysUntilExpiry !== 1 ? 's' : ''})
                  </Badge>
                ))}
              </div>
            </CardContent>
          </Card>
        )}

        {/* Category Cards */}
        <div className="grid md:grid-cols-3 gap-4 mb-8">
          {Object.entries(CATEGORY_CONFIG).map(([key, config]) => {
            const Icon = config.icon;
            const isSelected = selectedCategory === key;
            return (
              <Card
                key={key}
                className={`cursor-pointer transition-all border-2 ${config.bgClass} ${config.borderClass} ${isSelected ? 'ring-2 ring-offset-2 ring-gray-400' : ''}`}
                onClick={() => handleCategorySelect(key)}
              >
                <CardHeader>
                  <div className="flex items-center gap-3 mb-2">
                    <div className={`p-2 ${config.iconBg} rounded-lg`}>
                      <Icon className={`size-6 ${config.iconColor}`} />
                    </div>
                    <CardTitle>{config.label}</CardTitle>
                  </div>
                  <CardDescription>{config.description}</CardDescription>
                </CardHeader>
                <CardContent>
                  <p className="text-sm text-gray-500">Click to generate AI recipes</p>
                </CardContent>
              </Card>
            );
          })}
        </div>

        {/* Loading */}
        {loading && (
          <div className="flex flex-col items-center justify-center py-16 gap-4">
            <div className="relative">
              <div className="size-16 rounded-full border-4 border-orange-200 border-t-orange-600 animate-spin" />
              <ChefHat className="absolute inset-0 m-auto size-6 text-orange-600" />
            </div>
            <p className="text-gray-600 font-medium">Generating personalized recipes with AI...</p>
            <p className="text-sm text-gray-400">Analyzing your inventory and preferences</p>
          </div>
        )}

        {/* Error */}
        {error && !loading && (
          <Card className="border-red-200 bg-red-50 mb-6">
            <CardContent className="pt-6 flex items-center gap-3">
              <AlertCircle className="size-5 text-red-500" />
              <p className="text-red-700">{error}</p>
              <Button variant="outline" size="sm" onClick={() => selectedCategory && handleCategorySelect(selectedCategory)}>
                <RefreshCw className="size-4 mr-1" /> Retry
              </Button>
            </CardContent>
          </Card>
        )}

        {/* Recipe List */}
        {!loading && recipes.length > 0 && (
          <>
            <div className="flex items-center justify-between mb-4">
              <h3 className="text-xl font-semibold">
                {CATEGORY_CONFIG[selectedCategory as keyof typeof CATEGORY_CONFIG]?.label} Options
                <Badge variant="secondary" className="ml-2 text-xs">AI Generated</Badge>
              </h3>
              <Button variant="ghost" size="sm" onClick={() => selectedCategory && handleCategorySelect(selectedCategory)}>
                <RefreshCw className="size-4 mr-1" /> Regenerate
              </Button>
            </div>

            <div className="flex flex-col gap-3">
              {recipes.map((recipe, index) => (
                <Card
                  key={index}
                  className="cursor-pointer hover:shadow-md transition-all border-2 hover:border-orange-300"
                  onClick={() => handleRecipeClick(recipe)}
                >
                  <CardContent className="py-4 px-5">
                    <div className="flex items-center gap-4">
                      {/* Emoji */}
                      <span className="text-4xl flex-shrink-0">{recipe.emoji}</span>

                      {/* Main info */}
                      <div className="flex-1 min-w-0">
                        <p className="font-semibold text-gray-900 text-lg leading-tight">{recipe.title}</p>
                        <p className="text-sm text-gray-500 line-clamp-1 mt-0.5">{recipe.description}</p>
                        {/* Tags */}
                        {recipe.tags?.length > 0 && (
                          <div className="flex flex-wrap gap-1.5 mt-2">
                            {recipe.tags.map(tag => (
                              <span key={tag} className={`inline-flex items-center px-2 py-0.5 rounded-full text-xs font-medium ${getTagStyle(tag)}`}>
                                {formatTag(tag)}
                              </span>
                            ))}
                          </div>
                        )}
                      </div>

                      {/* Meta */}
                      <div className="flex flex-col items-end gap-1.5 flex-shrink-0">
                        <Badge className="bg-white border text-gray-700 text-xs font-normal">
                          <Clock className="size-3 mr-1" />{recipe.cookTime}min
                        </Badge>
                        <Badge className="bg-orange-600 text-white text-xs capitalize">{recipe.difficulty}</Badge>
                      </div>
                    </div>

                    {/* Nutrition strip */}
                    <div className="mt-3 pt-3 border-t flex items-center gap-6">
                      <span className="text-xs text-gray-500"><span className="font-semibold text-gray-800">{recipe.nutrition.calories}</span> cal</span>
                      <span className="text-xs text-gray-500"><span className="font-semibold text-gray-800">{recipe.nutrition.protein}g</span> protein</span>
                      <span className="text-xs text-gray-500"><span className="font-semibold text-gray-800">{recipe.nutrition.carbs}g</span> carbs</span>
                      <span className="text-xs text-gray-500"><span className="font-semibold text-gray-800">{recipe.nutrition.fat}g</span> fat</span>
                      <span className="ml-auto text-xs text-green-600 font-medium">
                        ✓ {recipe.matchedIngredients?.length || 0} in your pantry
                      </span>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          </>
        )}

        {/* Empty State */}
        {!loading && !selectedCategory && (
          <div className="text-center py-12 text-gray-500">
            <ChefHat className="size-12 mx-auto mb-3 text-orange-300" />
            <p className="text-lg font-medium">Pick a category above to get started</p>
            <p className="text-sm">Our AI will generate personalized recipes based on your inventory</p>
          </div>
        )}
      </main>
    </div>
  );
}
