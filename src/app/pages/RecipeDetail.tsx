import { useState, useEffect, useRef } from 'react';
import { useParams, useNavigate } from 'react-router';
import { ArrowLeft, Clock, ChefHat, CheckCircle2, Circle, MessageCircle, Send, Loader2, X, Lightbulb } from 'lucide-react';
import { Button } from '../components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '../components/ui/card';
import { Badge } from '../components/ui/badge';
import { Input } from '../components/ui/input';
import { getRecipeById } from '../data/mockData';
import { generateCookingHelp, type GeneratedRecipe } from '../lib/ai';
import { toast } from 'sonner';

interface ChatMessage {
  role: 'user' | 'assistant';
  content: string;
}

export function RecipeDetail() {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();
  const [chatOpen, setChatOpen] = useState(false);
  const [messages, setMessages] = useState<ChatMessage[]>([]);
  const [inputValue, setInputValue] = useState('');
  const [chatLoading, setChatLoading] = useState(false);
  const chatEndRef = useRef<HTMLDivElement>(null);

  // Try to get AI-generated recipe from sessionStorage, fall back to mock data
  let recipe: GeneratedRecipe | undefined;

  if (id?.startsWith('ai-')) {
    const stored = sessionStorage.getItem('currentRecipe');
    if (stored) recipe = JSON.parse(stored);
  } else {
    const mockRecipe = id ? getRecipeById(id) : undefined;
    if (mockRecipe) {
      recipe = {
        ...mockRecipe,
        emoji: '🍽️',
        cuisine: 'International',
        tip: 'Prep all ingredients before you start cooking for a smoother experience.',
        matchedIngredients: mockRecipe.matchedIngredients || [],
        missingIngredients: mockRecipe.missingIngredients || [],
      };
    }
  }

  useEffect(() => {
    chatEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [messages]);

  if (!recipe) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-center">
          <h2 className="text-2xl font-bold mb-2">Recipe not found</h2>
          <Button onClick={() => navigate('/')}>Back to Home</Button>
        </div>
      </div>
    );
  }

  const handleStartCooking = () => {
    toast.success("Happy cooking! 🎉 You've got this!");
    setChatOpen(true);
    setMessages([{
      role: 'assistant',
      content: `I'm here to help while you cook **${recipe!.title}**! Ask me anything — substitutions, techniques, timing questions, or if something looks off. Happy cooking! 🍳`
    }]);
  };

  const handleSendMessage = async () => {
    if (!inputValue.trim() || chatLoading) return;
    const userMsg = inputValue.trim();
    setInputValue('');
    setMessages(prev => [...prev, { role: 'user', content: userMsg }]);
    setChatLoading(true);

    try {
      const response = await generateCookingHelp(recipe!, userMsg);
      setMessages(prev => [...prev, { role: 'assistant', content: response }]);
    } catch {
      setMessages(prev => [...prev, { role: 'assistant', content: "Sorry, I'm having trouble connecting right now. Try again in a moment!" }]);
    } finally {
      setChatLoading(false);
    }
  };

  const suggestedQuestions = [
    "Can I substitute any ingredients?",
    "How do I know when it's done?",
    "Any tips for better flavor?",
  ];

  return (
    <div className="min-h-screen bg-gradient-to-br from-orange-50 via-white to-green-50">
      {/* Header */}
      <header className="border-b bg-white/80 backdrop-blur-sm sticky top-0 z-10">
        <div className="container mx-auto px-4 py-4 flex items-center gap-4">
          <Button variant="ghost" size="icon" onClick={() => navigate('/')}>
            <ArrowLeft className="size-5" />
          </Button>
          <div className="flex items-center gap-2">
            <ChefHat className="size-8 text-orange-600" />
            <h1 className="text-2xl font-bold text-gray-900">CookBuddy</h1>
          </div>
        </div>
      </header>

      <main className="container mx-auto px-4 py-8 max-w-4xl">
        {/* Hero — emoji + title */}
        <div className="mb-8 flex items-center gap-5">
          <span className="text-7xl flex-shrink-0">{recipe.emoji || '🍽️'}</span>
          <div>
            <h1 className="text-3xl font-bold text-gray-900 leading-tight">{recipe.title}</h1>
            <div className="flex gap-2 mt-2">
              <Badge className="bg-white border text-gray-700">
                <Clock className="size-3 mr-1" />{recipe.cookTime} min
              </Badge>
              <Badge className="bg-orange-600 text-white capitalize">{recipe.difficulty}</Badge>
            </div>
            <p className="text-gray-600 text-sm mt-2">{recipe.description}</p>
          </div>
        </div>

        {/* Chef Tip */}
        {recipe.tip && (
          <Card className="mb-6 border-amber-200 bg-amber-50">
            <CardContent className="pt-4 pb-4 flex items-start gap-3">
              <Lightbulb className="size-5 text-amber-600 mt-0.5 flex-shrink-0" />
              <div>
                <p className="font-semibold text-amber-900 text-sm">Chef's Tip</p>
                <p className="text-amber-800 text-sm">{recipe.tip}</p>
              </div>
            </CardContent>
          </Card>
        )}

        {/* Nutrition */}
        <Card className="mb-6">
          <CardHeader><CardTitle>Nutrition per Serving</CardTitle></CardHeader>
          <CardContent>
            <div className="grid grid-cols-4 gap-4 text-center">
              {[
                { label: 'Calories', value: recipe.nutrition.calories, color: 'blue', unit: '' },
                { label: 'Protein', value: recipe.nutrition.protein, color: 'green', unit: 'g' },
                { label: 'Carbs', value: recipe.nutrition.carbs, color: 'orange', unit: 'g' },
                { label: 'Fat', value: recipe.nutrition.fat, color: 'purple', unit: 'g' },
              ].map(item => (
                <div key={item.label} className={`p-4 bg-${item.color}-50 rounded-lg`}>
                  <p className="text-sm text-gray-600 mb-1">{item.label}</p>
                  <p className={`text-2xl font-bold text-${item.color}-600`}>{item.value}{item.unit}</p>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>

        {/* Ingredients */}
        <Card className="mb-6">
          <CardHeader>
            <CardTitle>Ingredients</CardTitle>
            {recipe.matchedIngredients.length > 0 && (
              <p className="text-sm text-green-600 font-medium">
                ✓ You have {recipe.matchedIngredients.length} of {recipe.ingredients.length} ingredients
              </p>
            )}
          </CardHeader>
          <CardContent>
            <ul className="space-y-3">
              {recipe.ingredients.map((ingredient, index) => {
                const isMatched = recipe!.matchedIngredients.some(m =>
                  ingredient.toLowerCase().includes(m.toLowerCase())
                );
                return (
                  <li key={index} className="flex items-start gap-3">
                    {isMatched
                      ? <CheckCircle2 className="size-5 text-green-600 mt-0.5 flex-shrink-0" />
                      : <Circle className="size-5 text-gray-300 mt-0.5 flex-shrink-0" />
                    }
                    <span className={isMatched ? 'text-gray-900' : 'text-gray-500'}>{ingredient}</span>
                  </li>
                );
              })}
            </ul>
            {recipe.missingIngredients.length > 0 && (
              <div className="mt-4 p-3 bg-gray-50 rounded-lg border">
                <p className="text-sm text-gray-600">
                  <strong>Need to grab:</strong> {recipe.missingIngredients.join(', ')}
                </p>
              </div>
            )}
          </CardContent>
        </Card>

        {/* Instructions */}
        <Card className="mb-8">
          <CardHeader><CardTitle>Instructions</CardTitle></CardHeader>
          <CardContent>
            <ol className="space-y-4">
              {recipe.instructions.map((step, index) => (
                <li key={index} className="flex gap-4">
                  <div className="flex-shrink-0 w-8 h-8 bg-orange-100 text-orange-600 rounded-full flex items-center justify-center font-semibold text-sm">
                    {index + 1}
                  </div>
                  <p className="text-gray-700 pt-1">{step}</p>
                </li>
              ))}
            </ol>
          </CardContent>
        </Card>

        {/* Action Buttons */}
        <div className="flex flex-col sm:flex-row gap-4">
          <Button size="lg" className="flex-1 bg-orange-600 hover:bg-orange-700" onClick={handleStartCooking}>
            <ChefHat className="size-4 mr-2" /> Start Cooking
          </Button>
          <Button size="lg" variant="outline" className="flex-1" onClick={() => navigate('/')}>
            Choose Different Recipe
          </Button>
        </div>
      </main>

      {/* Cooking Assistant Chat */}
      {chatOpen && (
        <div className="fixed bottom-4 right-4 w-80 bg-white rounded-2xl shadow-2xl border-2 border-orange-200 flex flex-col z-50 max-h-96">
          <div className="flex items-center justify-between p-3 border-b bg-orange-50 rounded-t-2xl">
            <div className="flex items-center gap-2">
              <ChefHat className="size-4 text-orange-600" />
              <span className="font-semibold text-sm text-orange-900">Cooking Assistant</span>
              <div className="size-2 rounded-full bg-green-500" />
            </div>
            <Button variant="ghost" size="icon" className="size-6" onClick={() => setChatOpen(false)}>
              <X className="size-4" />
            </Button>
          </div>

          <div className="flex-1 overflow-y-auto p-3 space-y-3 min-h-0">
            {messages.map((msg, i) => (
              <div key={i} className={`flex ${msg.role === 'user' ? 'justify-end' : 'justify-start'}`}>
                <div className={`max-w-[85%] text-xs px-3 py-2 rounded-xl leading-relaxed ${
                  msg.role === 'user'
                    ? 'bg-orange-600 text-white rounded-br-sm'
                    : 'bg-gray-100 text-gray-800 rounded-bl-sm'
                }`}>
                  {msg.content}
                </div>
              </div>
            ))}
            {chatLoading && (
              <div className="flex justify-start">
                <div className="bg-gray-100 px-3 py-2 rounded-xl rounded-bl-sm">
                  <Loader2 className="size-4 animate-spin text-gray-500" />
                </div>
              </div>
            )}
            <div ref={chatEndRef} />
          </div>

          {/* Suggested Questions */}
          {messages.length <= 1 && (
            <div className="px-3 pb-2 flex flex-wrap gap-1">
              {suggestedQuestions.map(q => (
                <button
                  key={q}
                  onClick={() => { setInputValue(q); }}
                  className="text-xs bg-orange-50 text-orange-700 px-2 py-1 rounded-full border border-orange-200 hover:bg-orange-100 transition-colors"
                >
                  {q}
                </button>
              ))}
            </div>
          )}

          <div className="p-3 border-t flex gap-2">
            <Input
              className="text-xs h-8"
              placeholder="Ask anything..."
              value={inputValue}
              onChange={e => setInputValue(e.target.value)}
              onKeyDown={e => e.key === 'Enter' && handleSendMessage()}
            />
            <Button size="sm" className="size-8 p-0 bg-orange-600 hover:bg-orange-700" onClick={handleSendMessage} disabled={chatLoading}>
              <Send className="size-3" />
            </Button>
          </div>
        </div>
      )}

      {/* Floating Chat Button (when closed) */}
      {!chatOpen && (
        <button
          onClick={() => setChatOpen(true)}
          className="fixed bottom-4 right-4 size-14 bg-orange-600 hover:bg-orange-700 text-white rounded-full shadow-lg flex items-center justify-center transition-all hover:scale-110 z-50"
        >
          <MessageCircle className="size-6" />
        </button>
      )}
    </div>
  );
}
