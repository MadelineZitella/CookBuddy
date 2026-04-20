import { useNavigate } from 'react-router';
import { ArrowLeft, ChefHat, ArrowRight, Database, Brain, Sparkles, CheckCircle, Download } from 'lucide-react';
import { Button } from '../components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '../components/ui/card';
import { PipelineVisual } from '../components/PipelineVisual';

export function PipelineDiagram() {
  const navigate = useNavigate();

  return (
    <div className="min-h-screen bg-gradient-to-br from-orange-50 via-white to-green-50">
      {/* Header */}
      <header className="border-b bg-white/80 backdrop-blur-sm sticky top-0 z-10">
        <div className="container mx-auto px-4 py-4 flex items-center gap-4">
          <Button 
            variant="ghost" 
            size="icon"
            onClick={() => navigate('/')}
          >
            <ArrowLeft className="size-5" />
          </Button>
          <div className="flex items-center gap-2">
            <ChefHat className="size-8 text-orange-600" />
            <h1 className="text-2xl font-bold text-gray-900">AI Pipeline Architecture</h1>
          </div>
        </div>
      </header>

      <main className="container mx-auto px-4 py-8 max-w-6xl">
        {/* Introduction */}
        <Card className="mb-8 bg-gradient-to-r from-orange-50 to-green-50 border-orange-200">
          <CardHeader>
            <CardTitle className="text-2xl">How CookBuddy's AI Works</CardTitle>
            <CardDescription className="text-base">
              CookBuddy uses multiple LLM-powered components to reduce decision fatigue and provide personalized meal suggestions
            </CardDescription>
          </CardHeader>
          <CardContent>
            <div className="bg-white/80 p-4 rounded-lg border border-orange-200">
              <p className="text-sm text-gray-700 flex items-center gap-2">
                <Download className="size-4" />
                <strong>For your assignment:</strong> Screenshot this page or use browser print-to-PDF to export the complete pipeline diagram
              </p>
              <Button 
                variant="outline" 
                className="mt-3"
                onClick={() => navigate('/pipeline-print')}
              >
                Open Printable View
              </Button>
            </div>
          </CardContent>
        </Card>

        {/* Simplified Visual Pipeline */}
        <div className="mb-12">
          <PipelineVisual />
        </div>

        {/* Detailed Pipeline Diagram */}
        <div className="mb-8">
          <h2 className="text-2xl font-bold mb-4">Detailed Pipeline Stages</h2>
        </div>

        <div className="space-y-8">
          {/* Step 1: User Input */}
          <div className="flex items-start gap-6">
            <div className="flex-shrink-0 w-12 h-12 bg-blue-100 rounded-full flex items-center justify-center">
              <span className="font-bold text-blue-600 text-lg">1</span>
            </div>
            <Card className="flex-1 border-blue-200">
              <CardHeader>
                <div className="flex items-center gap-3">
                  <Database className="size-6 text-blue-600" />
                  <CardTitle>User Input Collection</CardTitle>
                </div>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="bg-blue-50 p-4 rounded-lg">
                  <p className="font-semibold mb-2 text-blue-900">Input Data:</p>
                  <ul className="space-y-1 text-sm text-blue-800">
                    <li>• Current inventory (ingredients, quantities, expiry dates)</li>
                    <li>• User preferences (learned from past interactions)</li>
                    <li>• Context trigger: "Quick Dinner" / "Use Soon" / "Something Different"</li>
                    <li>• Time constraint (optional)</li>
                    <li>• Dietary preferences (optional)</li>
                  </ul>
                </div>
                <div className="bg-white border-2 border-blue-200 p-3 rounded-lg">
                  <p className="text-sm font-mono text-gray-700">
                    Example: User has [chicken, zucchini, rice] expiring in 2 days, clicks "Use Soon"
                  </p>
                </div>
              </CardContent>
            </Card>
          </div>

          <div className="flex justify-center">
            <ArrowRight className="size-8 text-gray-400" />
          </div>

          {/* Step 2: Context Classification */}
          <div className="flex items-start gap-6">
            <div className="flex-shrink-0 w-12 h-12 bg-purple-100 rounded-full flex items-center justify-center">
              <span className="font-bold text-purple-600 text-lg">2</span>
            </div>
            <Card className="flex-1 border-purple-200">
              <CardHeader>
                <div className="flex items-center gap-3">
                  <Brain className="size-6 text-purple-600" />
                  <CardTitle>Context & Intent Analysis (LLM 1)</CardTitle>
                </div>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="bg-purple-50 p-4 rounded-lg">
                  <p className="font-semibold mb-2 text-purple-900">LLM Model: GPT-4 or Claude</p>
                  <p className="text-sm text-purple-800 mb-3">
                    Analyzes user context and prioritizes recommendation criteria
                  </p>
                  <div className="bg-white p-3 rounded border border-purple-200">
                    <p className="text-xs font-semibold text-purple-900 mb-2">Sample Prompt:</p>
                    <p className="text-xs font-mono text-gray-700">
                      "Given inventory: [chicken breast (expires: 2 days), zucchini (expires: 3 days), rice]
                      <br/>User selected: 'Use Soon'
                      <br/>Identify: (1) ingredients needing priority use, (2) suitable cuisines, (3) time constraints"
                    </p>
                  </div>
                </div>
                <div className="bg-white border-2 border-purple-200 p-3 rounded-lg">
                  <p className="text-sm font-semibold mb-2">Output:</p>
                  <p className="text-sm font-mono text-gray-700">
                    Priority ingredients: [chicken, zucchini]<br/>
                    Suggested cuisines: [Asian, Mediterranean]<br/>
                    Constraint: Use expiring items first
                  </p>
                </div>
              </CardContent>
            </Card>
          </div>

          <div className="flex justify-center">
            <ArrowRight className="size-8 text-gray-400" />
          </div>

          {/* Step 3: Recipe Generation */}
          <div className="flex items-start gap-6">
            <div className="flex-shrink-0 w-12 h-12 bg-green-100 rounded-full flex items-center justify-center">
              <span className="font-bold text-green-600 text-lg">3</span>
            </div>
            <Card className="flex-1 border-green-200">
              <CardHeader>
                <div className="flex items-center gap-3">
                  <Sparkles className="size-6 text-green-600" />
                  <CardTitle>Recipe Generation & Personalization (LLM 2)</CardTitle>
                </div>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="bg-green-50 p-4 rounded-lg">
                  <p className="font-semibold mb-2 text-green-900">LLM Model: GPT-4 or Claude</p>
                  <p className="text-sm text-green-800 mb-3">
                    Generates creative, personalized recipe suggestions matching inventory and constraints
                  </p>
                  <div className="bg-white p-3 rounded border border-green-200">
                    <p className="text-xs font-semibold text-green-900 mb-2">Sample Prompt:</p>
                    <p className="text-xs font-mono text-gray-700">
                      "Create 3 recipe options using priority ingredients [chicken, zucchini] with rice.
                      <br/>Constraints: 20-30 min cook time, prevent food waste
                      <br/>Style: Fresh variation on familiar ingredients (avoid 'chicken and rice again')
                      <br/>Format: Title, description, ingredients list, step-by-step instructions
                      <br/>Tone: Encouraging, acknowledges user's decision fatigue"
                    </p>
                  </div>
                </div>
                <div className="bg-white border-2 border-green-200 p-3 rounded-lg">
                  <p className="text-sm font-semibold mb-2">Output:</p>
                  <p className="text-sm font-mono text-gray-700">
                    Recipe 1: "Thai Ginger Chicken Bowl - A fresh twist on your usual chicken routine..."<br/>
                    Recipe 2: "Lemon Herb Chicken with Roasted Zucchini..."<br/>
                    Recipe 3: "Quick Chicken Stir-Fry with Garlic Rice..."
                  </p>
                </div>
              </CardContent>
            </Card>
          </div>

          <div className="flex justify-center">
            <ArrowRight className="size-8 text-gray-400" />
          </div>

          {/* Step 4: Nutrition Estimation */}
          <div className="flex items-start gap-6">
            <div className="flex-shrink-0 w-12 h-12 bg-orange-100 rounded-full flex items-center justify-center">
              <span className="font-bold text-orange-600 text-lg">4</span>
            </div>
            <Card className="flex-1 border-orange-200">
              <CardHeader>
                <div className="flex items-center gap-3">
                  <Brain className="size-6 text-orange-600" />
                  <CardTitle>Nutrition Analysis (LLM 3)</CardTitle>
                </div>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="bg-orange-50 p-4 rounded-lg">
                  <p className="font-semibold mb-2 text-orange-900">LLM Model: GPT-4 (with knowledge cutoff nutrition data)</p>
                  <p className="text-sm text-orange-800 mb-3">
                    Provides passive nutrition awareness without manual tracking
                  </p>
                  <div className="bg-white p-3 rounded border border-orange-200">
                    <p className="text-xs font-semibold text-orange-900 mb-2">Sample Prompt:</p>
                    <p className="text-xs font-mono text-gray-700">
                      "Estimate nutrition for: Thai Ginger Chicken Bowl (2 chicken breasts, 1 zucchini, 1 cup rice, 2 tbsp soy sauce, 1 tbsp oil)
                      <br/>Provide: Total calories, protein (g), carbs (g), fat (g) per serving
                      <br/>Serving size: 1 person"
                    </p>
                  </div>
                </div>
                <div className="bg-white border-2 border-orange-200 p-3 rounded-lg">
                  <p className="text-sm font-semibold mb-2">Output:</p>
                  <p className="text-sm font-mono text-gray-700">
                    Calories: 425, Protein: 38g, Carbs: 42g, Fat: 12g
                  </p>
                </div>
              </CardContent>
            </Card>
          </div>

          <div className="flex justify-center">
            <ArrowRight className="size-8 text-gray-400" />
          </div>

          {/* Step 5: Presentation Layer */}
          <div className="flex items-start gap-6">
            <div className="flex-shrink-0 w-12 h-12 bg-indigo-100 rounded-full flex items-center justify-center">
              <span className="font-bold text-indigo-600 text-lg">5</span>
            </div>
            <Card className="flex-1 border-indigo-200">
              <CardHeader>
                <div className="flex items-center gap-3">
                  <CheckCircle className="size-6 text-indigo-600" />
                  <CardTitle>Suggestion Presentation</CardTitle>
                </div>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="bg-indigo-50 p-4 rounded-lg">
                  <p className="font-semibold mb-2 text-indigo-900">User Interface Display:</p>
                  <ul className="space-y-1 text-sm text-indigo-800">
                    <li>• Recipe cards with appealing descriptions</li>
                    <li>• Matched vs. missing ingredients highlighted</li>
                    <li>• Passive nutrition display (no manual tracking required)</li>
                    <li>• Cook time and difficulty badges</li>
                    <li>• Simple, non-prescriptive suggestions (user maintains control)</li>
                  </ul>
                </div>
                <div className="bg-white border-2 border-indigo-200 p-3 rounded-lg">
                  <p className="text-sm font-semibold mb-2">Design Principle:</p>
                  <p className="text-sm text-gray-700">
                    Suggest, don't prescribe. Allow easy pivoting. Reduce cognitive load, not add to it.
                  </p>
                </div>
              </CardContent>
            </Card>
          </div>
        </div>

        {/* Key Design Decisions */}
        <Card className="mt-12 bg-gradient-to-br from-gray-50 to-gray-100">
          <CardHeader>
            <CardTitle className="text-xl">Key AI Design Decisions</CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="grid md:grid-cols-2 gap-4">
              <div className="bg-white p-4 rounded-lg border-2 border-gray-200">
                <h4 className="font-semibold mb-2 text-gray-900">Multi-Stage LLM Pipeline</h4>
                <p className="text-sm text-gray-700">
                  Separate models for context analysis, recipe generation, and nutrition estimation allow for specialized prompts and better outputs
                </p>
              </div>
              <div className="bg-white p-4 rounded-lg border-2 border-gray-200">
                <h4 className="font-semibold mb-2 text-gray-900">Passive Data Collection</h4>
                <p className="text-sm text-gray-700">
                  System works with partial inventory data and learns patterns over time without requiring manual input
                </p>
              </div>
              <div className="bg-white p-4 rounded-lg border-2 border-gray-200">
                <h4 className="font-semibold mb-2 text-gray-900">Flexible Input Methods</h4>
                <p className="text-sm text-gray-700">
                  Future: Receipt scanning, voice input, or manual entry to minimize user effort
                </p>
              </div>
              <div className="bg-white p-4 rounded-lg border-2 border-gray-200">
                <h4 className="font-semibold mb-2 text-gray-900">Context-Aware Generation</h4>
                <p className="text-sm text-gray-700">
                  Prompts explicitly acknowledge decision fatigue and provide "fresh twists" rather than repetitive suggestions
                </p>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Prompting Strategy Notes */}
        <Card className="mt-8">
          <CardHeader>
            <CardTitle>Prompting Strategy Insights</CardTitle>
            <CardDescription>Key learnings from LLM experimentation</CardDescription>
          </CardHeader>
          <CardContent className="space-y-3">
            <div className="space-y-2">
              <div className="flex items-start gap-3">
                <div className="w-2 h-2 bg-green-600 rounded-full mt-2"></div>
                <div>
                  <p className="font-semibold text-sm">Explicit constraint framing improves relevance</p>
                  <p className="text-sm text-gray-600">
                    Adding "prevent food waste" and expiry information leads to better prioritization
                  </p>
                </div>
              </div>
              <div className="flex items-start gap-3">
                <div className="w-2 h-2 bg-green-600 rounded-full mt-2"></div>
                <div>
                  <p className="font-semibold text-sm">Tone instructions reduce "cookbook voice"</p>
                  <p className="text-sm text-gray-600">
                    Prompts like "acknowledge decision fatigue" create more empathetic, less robotic responses
                  </p>
                </div>
              </div>
              <div className="flex items-start gap-3">
                <div className="w-2 h-2 bg-green-600 rounded-full mt-2"></div>
                <div>
                  <p className="font-semibold text-sm">Few-shot examples maintain consistency</p>
                  <p className="text-sm text-gray-600">
                    Providing 1-2 example recipe outputs ensures consistent formatting across generations
                  </p>
                </div>
              </div>
              <div className="flex items-start gap-3">
                <div className="w-2 h-2 bg-green-600 rounded-full mt-2"></div>
                <div>
                  <p className="font-semibold text-sm">Separate nutrition estimation improves accuracy</p>
                  <p className="text-sm text-gray-600">
                    Dedicated nutrition prompt with specific portion sizes yields more reliable estimates
                  </p>
                </div>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Back Button */}
        <div className="mt-12 text-center">
          <Button 
            size="lg"
            onClick={() => navigate('/')}
            className="bg-orange-600 hover:bg-orange-700"
          >
            Back to CookBuddy
          </Button>
        </div>
      </main>
    </div>
  );
}