import { useNavigate } from 'react-router';
import { ArrowLeft, ChefHat, Download, FileText, Camera } from 'lucide-react';
import { Button } from '../components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '../components/ui/card';

export function ExportGuide() {
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
            <h1 className="text-2xl font-bold text-gray-900">Export Guide</h1>
          </div>
        </div>
      </header>

      <main className="container mx-auto px-4 py-8 max-w-4xl">
        <Card className="mb-8 bg-gradient-to-r from-orange-50 to-green-50 border-orange-200">
          <CardHeader>
            <CardTitle className="text-2xl">How to Export Your Prototype</CardTitle>
            <CardDescription className="text-base">
              Follow these steps to export screenshots and documentation for your checkpoint submission
            </CardDescription>
          </CardHeader>
        </Card>

        {/* Screenshot Instructions */}
        <Card className="mb-6">
          <CardHeader>
            <div className="flex items-center gap-3">
              <Camera className="size-6 text-blue-600" />
              <CardTitle>Taking Screenshots for PDF</CardTitle>
            </div>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="space-y-3">
              <div className="bg-blue-50 p-4 rounded-lg">
                <h4 className="font-semibold mb-2 text-blue-900">Screens to Capture:</h4>
                <ol className="space-y-2 text-sm text-blue-800">
                  <li>1. <strong>Home Screen</strong> - Shows the three main entry points (Quick Dinner, Use Soon, Something Different)</li>
                  <li>2. <strong>Recipe Cards View</strong> - Demonstrates meal suggestions with nutrition info</li>
                  <li>3. <strong>Recipe Detail Page</strong> - Full recipe with ingredients, instructions, and nutrition breakdown</li>
                  <li>4. <strong>Inventory Management</strong> - Shows how users can add and track ingredients</li>
                  <li>5. <strong>AI Pipeline Diagram</strong> - Complete visual explanation of the LLM workflow</li>
                </ol>
              </div>

              <div className="bg-gray-50 p-4 rounded-lg border border-gray-200">
                <h4 className="font-semibold mb-2">Screenshot Tips:</h4>
                <ul className="space-y-1 text-sm text-gray-700">
                  <li>• Use full browser window for consistent sizing</li>
                  <li>• Capture both desktop and mobile views if needed</li>
                  <li>• Ensure all text is readable in the screenshots</li>
                  <li>• Show different states (e.g., "Use Soon" filter active)</li>
                </ul>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* AI Pipeline Export */}
        <Card className="mb-6">
          <CardHeader>
            <div className="flex items-center gap-3">
              <FileText className="size-6 text-green-600" />
              <CardTitle>Exporting AI Pipeline Diagram</CardTitle>
            </div>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="bg-green-50 p-4 rounded-lg">
              <p className="text-sm text-green-800 mb-3">
                The AI Pipeline page at <code className="bg-white px-2 py-1 rounded">/pipeline</code> contains a comprehensive visual diagram showing:
              </p>
              <ul className="space-y-1 text-sm text-green-800">
                <li>• User input collection and data flow</li>
                <li>• LLM 1: Context & Intent Analysis</li>
                <li>• LLM 2: Recipe Generation & Personalization</li>
                <li>• LLM 3: Nutrition Analysis</li>
                <li>• Presentation layer and UI display</li>
                <li>• Sample prompts and outputs for each stage</li>
                <li>• Key design decisions and prompting strategies</li>
              </ul>
            </div>
            <div className="bg-white border border-gray-200 p-4 rounded-lg">
              <p className="text-sm font-semibold mb-2">How to Export:</p>
              <ol className="space-y-1 text-sm text-gray-700">
                <li>1. Navigate to the Pipeline page from the menu</li>
                <li>2. Scroll to capture all 5 stages of the pipeline</li>
                <li>3. Take multiple screenshots or use browser print-to-PDF</li>
                <li>4. Include in your checkpoint document under "LLM Functionality Prototyping"</li>
              </ol>
            </div>
          </CardContent>
        </Card>

        {/* User Flow Documentation */}
        <Card className="mb-6">
          <CardHeader>
            <div className="flex items-center gap-3">
              <Download className="size-6 text-purple-600" />
              <CardTitle>Key User Flow to Document</CardTitle>
            </div>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="bg-purple-50 p-4 rounded-lg">
              <h4 className="font-semibold mb-3 text-purple-900">Recommended Scenario for Testing:</h4>
              <div className="space-y-3 text-sm text-purple-800">
                <div className="bg-white p-3 rounded border border-purple-200">
                  <p className="font-semibold mb-1">Scenario: "Use Ingredients Before They Expire"</p>
                  <p className="text-xs text-gray-600 mb-2">Based on Participant 1 & 2's food waste concerns</p>
                  <ol className="space-y-1 text-xs">
                    <li>1. User opens CookBuddy and sees expiring ingredients alert</li>
                    <li>2. Clicks "Need to Use Soon" card</li>
                    <li>3. Views recipes prioritizing chicken and zucchini (expiring in 2-3 days)</li>
                    <li>4. Selects "Thai Ginger Chicken Bowl" as a fresh alternative</li>
                    <li>5. Reviews recipe, sees they have 7 of 8 ingredients</li>
                    <li>6. Checks nutrition info (high protein, balanced)</li>
                    <li>7. Starts cooking with confidence</li>
                  </ol>
                </div>

                <div className="bg-white p-3 rounded border border-purple-200">
                  <p className="font-semibold mb-1">Why This Scenario Works:</p>
                  <ul className="space-y-1 text-xs">
                    <li>✓ Addresses decision fatigue (reduces "what should I cook?" moment)</li>
                    <li>✓ Prevents food waste (uses expiring ingredients)</li>
                    <li>✓ Introduces variety ("fresh twist on usual chicken")</li>
                    <li>✓ Passive nutrition awareness (no manual tracking)</li>
                    <li>✓ Flexible, not prescriptive (user still chooses)</li>
                  </ul>
                </div>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Feature List */}
        <Card className="mb-6">
          <CardHeader>
            <CardTitle>Implemented Features</CardTitle>
            <CardDescription>Features supporting the key user scenario</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="grid md:grid-cols-2 gap-3">
              <div className="bg-gray-50 p-3 rounded-lg border border-gray-200">
                <h4 className="font-semibold text-sm mb-2">✓ Expiring Ingredients Alert</h4>
                <p className="text-xs text-gray-600">Proactive notification of items expiring within 3 days</p>
              </div>
              <div className="bg-gray-50 p-3 rounded-lg border border-gray-200">
                <h4 className="font-semibold text-sm mb-2">✓ Context-Based Entry Points</h4>
                <p className="text-xs text-gray-600">Quick Dinner, Use Soon, Something Different</p>
              </div>
              <div className="bg-gray-50 p-3 rounded-lg border border-gray-200">
                <h4 className="font-semibold text-sm mb-2">✓ Ingredient Matching Display</h4>
                <p className="text-xs text-gray-600">Shows what you have vs. what you need</p>
              </div>
              <div className="bg-gray-50 p-3 rounded-lg border border-gray-200">
                <h4 className="font-semibold text-sm mb-2">✓ Passive Nutrition Display</h4>
                <p className="text-xs text-gray-600">Calories, protein, carbs, fat - no manual tracking</p>
              </div>
              <div className="bg-gray-50 p-3 rounded-lg border border-gray-200">
                <h4 className="font-semibold text-sm mb-2">✓ Simplified Recipe Format</h4>
                <p className="text-xs text-gray-600">No blog scrolling, just clear instructions</p>
              </div>
              <div className="bg-gray-50 p-3 rounded-lg border border-gray-200">
                <h4 className="font-semibold text-sm mb-2">✓ Inventory Management</h4>
                <p className="text-xs text-gray-600">Manual input with expiry tracking</p>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Theory Connections */}
        <Card className="mb-6">
          <CardHeader>
            <CardTitle>Human-AI Design Principles Applied</CardTitle>
            <CardDescription>Connect your prototype to course theories</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-3">
              <div className="bg-blue-50 p-4 rounded-lg border-2 border-blue-200">
                <h4 className="font-semibold mb-2 text-blue-900">Mental Model & Transparency</h4>
                <p className="text-sm text-blue-800">
                  Pipeline diagram makes AI decision-making transparent. Users understand why certain recipes are suggested based on expiry dates and inventory.
                </p>
              </div>
              <div className="bg-green-50 p-4 rounded-lg border-2 border-green-200">
                <h4 className="font-semibold mb-2 text-green-900">Human Control & Agency</h4>
                <p className="text-sm text-green-800">
                  System suggests, never prescribes. Users maintain full control over meal decisions. Easy to pivot or ignore suggestions.
                </p>
              </div>
              <div className="bg-purple-50 p-4 rounded-lg border-2 border-purple-200">
                <h4 className="font-semibold mb-2 text-purple-900">Reducing Cognitive Load</h4>
                <p className="text-sm text-purple-800">
                  Context-based entry points eliminate the "what should I cook?" moment. Passive nutrition display avoids manual tracking burden.
                </p>
              </div>
              <div className="bg-orange-50 p-4 rounded-lg border-2 border-orange-200">
                <h4 className="font-semibold mb-2 text-orange-900">Contextual AI Assistance</h4>
                <p className="text-sm text-orange-800">
                  LLM prompts explicitly consider user context (decision fatigue, time constraints, food waste concerns) rather than just matching ingredients.
                </p>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Link to Live Prototype */}
        <div className="text-center space-y-4">
          <p className="text-sm text-gray-600">
            This is a fully interactive high-fidelity prototype. Navigate through all screens to test the complete user flow.
          </p>
          <div className="flex gap-4 justify-center">
            <Button 
              size="lg"
              onClick={() => navigate('/')}
              className="bg-orange-600 hover:bg-orange-700"
            >
              Back to Home
            </Button>
            <Button 
              size="lg"
              variant="outline"
              onClick={() => navigate('/pipeline')}
            >
              View AI Pipeline
            </Button>
          </div>
        </div>
      </main>
    </div>
  );
}
