import { PipelineVisual } from '../components/PipelineVisual';

/**
 * Standalone pipeline diagram optimized for printing/PDF export
 * Navigate to /pipeline-print for a clean printable view
 */
export function PipelinePrintView() {
  return (
    <div className="min-h-screen bg-white p-8">
      <div className="max-w-6xl mx-auto">
        <PipelineVisual />
        
        {/* Additional Context for Assignment */}
        <div className="mt-12 space-y-6 print:break-before-page">
          <h2 className="text-2xl font-bold border-b-2 border-gray-300 pb-2">
            Sample Prompts & Outputs
          </h2>
          
          {/* Context Analysis Prompt */}
          <div className="bg-purple-50 p-6 rounded-lg border-2 border-purple-300">
            <h3 className="font-bold text-purple-900 mb-3">Stage 2: Context Analysis Prompt (GPT-4/Claude)</h3>
            <div className="bg-white p-4 rounded border border-purple-300 mb-3">
              <p className="text-sm font-mono">
                You are assisting a home cook experiencing decision fatigue around meal planning.<br/><br/>
                
                USER CONTEXT:<br/>
                - Inventory: chicken breast (expires: 2 days), zucchini (expires: 3 days), rice, garlic, ginger, soy sauce<br/>
                - User selected: "Need to Use Soon"<br/>
                - Background: Cooks 5-6 times/week, experiencing food fatigue from repetitive meals<br/><br/>
                
                TASK:<br/>
                1. Identify ingredients requiring immediate use (expiring ≤3 days)<br/>
                2. Suggest 2-3 cuisine types that could create variety<br/>
                3. Infer user's likely constraints<br/><br/>
                
                OUTPUT FORMAT: JSON with priority_ingredients, suggested_cuisines, inferred_constraints
              </p>
            </div>
            <div className="bg-purple-100 p-3 rounded">
              <p className="text-sm font-semibold mb-1">Sample Output:</p>
              <p className="text-sm font-mono">
                &#123;"priority_ingredients": ["chicken breast", "zucchini"],<br/>
                "suggested_cuisines": ["Asian", "Mediterranean"],<br/>
                "inferred_constraints": ["time_efficient", "prevent_waste", "variety_needed"]&#125;
              </p>
            </div>
          </div>

          {/* Recipe Generation Prompt */}
          <div className="bg-green-50 p-6 rounded-lg border-2 border-green-300">
            <h3 className="font-bold text-green-900 mb-3">Stage 3: Recipe Generation Prompt (GPT-4/Claude)</h3>
            <div className="bg-white p-4 rounded border border-green-300 mb-3">
              <p className="text-sm font-mono">
                You are CookBuddy, an empathetic AI meal assistant helping reduce decision fatigue.<br/><br/>
                
                USER SITUATION:<br/>
                Expiring soon: chicken breast (2 days), zucchini (3 days)<br/>
                Available: rice, garlic, ginger, soy sauce, olive oil<br/>
                Pain point: Food fatigue from eating "the same thing"<br/><br/>
                
                YOUR TASK:<br/>
                Create ONE creative recipe that:<br/>
                1. Uses expiring ingredients (chicken, zucchini)<br/>
                2. Offers a "fresh twist" (NOT another "chicken and rice")<br/>
                3. Takes ≤25 minutes<br/>
                4. Uses simple techniques<br/><br/>
                
                TONE: Encouraging, conversational. Acknowledge their routine fatigue.<br/>
                TITLE FORMAT: "[Cuisine] [Protein] [Prep]" e.g. "Thai Ginger Chicken Bowl"
              </p>
            </div>
            <div className="bg-green-100 p-3 rounded">
              <p className="text-sm font-semibold mb-1">Sample Output:</p>
              <p className="text-sm">
                <strong>Title:</strong> "Thai Ginger Chicken Bowl"<br/>
                <strong>Description:</strong> "A fresh twist on your usual chicken routine - aromatic ginger and garlic chicken served over rice with sautéed zucchini. This dish brings bright Asian flavors to familiar ingredients you already have."<br/>
                <strong>Cook Time:</strong> 25 minutes
              </p>
            </div>
          </div>

          {/* Nutrition Prompt */}
          <div className="bg-orange-50 p-6 rounded-lg border-2 border-orange-300">
            <h3 className="font-bold text-orange-900 mb-3">Stage 4: Nutrition Analysis Prompt (GPT-4)</h3>
            <div className="bg-white p-4 rounded border border-orange-300 mb-3">
              <p className="text-sm font-mono">
                TASK: Estimate nutritional content for this recipe<br/><br/>
                
                RECIPE INGREDIENTS:<br/>
                - 2 chicken breasts (boneless, skinless), diced<br/>
                - 1 large zucchini, sliced<br/>
                - 1 cup uncooked white rice<br/>
                - 2 tablespoons soy sauce<br/>
                - 1 tablespoon olive oil<br/>
                - 2 cloves garlic, minced<br/>
                - 1 inch fresh ginger, grated<br/><br/>
                
                SERVING SIZE: 1 person<br/><br/>
                
                OUTPUT FORMAT: &#123;calories, protein_grams, carbs_grams, fat_grams&#125;<br/>
                Round to nearest whole number
              </p>
            </div>
            <div className="bg-orange-100 p-3 rounded">
              <p className="text-sm font-semibold mb-1">Sample Output:</p>
              <p className="text-sm font-mono">
                &#123;"calories": 425, "protein_grams": 38, "carbs_grams": 42, "fat_grams": 12&#125;
              </p>
            </div>
          </div>

          {/* Key Findings */}
          <div className="bg-gray-50 p-6 rounded-lg border-2 border-gray-300">
            <h3 className="font-bold text-gray-900 mb-3">Key Prompting Insights</h3>
            <div className="grid md:grid-cols-2 gap-4">
              <div>
                <h4 className="font-semibold text-sm mb-2 text-green-700">✓ What Worked:</h4>
                <ul className="text-sm space-y-1 text-gray-700">
                  <li>• Explicit emotional context ("decision fatigue")</li>
                  <li>• Structured JSON outputs for consistency</li>
                  <li>• Tone instructions ("encouraging, conversational")</li>
                  <li>• Specific serving sizes for nutrition</li>
                  <li>• Example formats ("Thai Ginger Bowl" NOT "Chicken")</li>
                </ul>
              </div>
              <div>
                <h4 className="font-semibold text-sm mb-2 text-red-700">✗ What Didn't Work:</h4>
                <ul className="text-sm space-y-1 text-gray-700">
                  <li>• Generic prompts → boring outputs</li>
                  <li>• Missing serving size → inconsistent nutrition</li>
                  <li>• Too many constraints at once</li>
                  <li>• Assuming context → must state explicitly</li>
                  <li>• No tone guidance → robotic cookbook voice</li>
                </ul>
              </div>
            </div>
          </div>

          {/* Design Principles */}
          <div className="bg-blue-50 p-6 rounded-lg border-2 border-blue-300 print:break-before-page">
            <h3 className="font-bold text-blue-900 mb-3">Human-AI Design Principles Applied</h3>
            <div className="space-y-3">
              <div className="bg-white p-3 rounded border border-blue-300">
                <h4 className="font-semibold text-sm mb-1">1. Transparency & Mental Models</h4>
                <p className="text-sm text-gray-700">
                  Pipeline diagram makes AI reasoning visible. Users understand WHY recipes are suggested based on expiry dates and variety needs.
                </p>
              </div>
              <div className="bg-white p-3 rounded border border-blue-300">
                <h4 className="font-semibold text-sm mb-1">2. User Control & Agency</h4>
                <p className="text-sm text-gray-700">
                  System suggests, never prescribes. Easy to pivot or ignore. No penalties for not following recommendations.
                </p>
              </div>
              <div className="bg-white p-3 rounded border border-blue-300">
                <h4 className="font-semibold text-sm mb-1">3. Reducing Cognitive Load</h4>
                <p className="text-sm text-gray-700">
                  Three clear entry points eliminate "what should I cook?" paralysis. Passive nutrition display avoids manual tracking.
                </p>
              </div>
              <div className="bg-white p-3 rounded border border-blue-300">
                <h4 className="font-semibold text-sm mb-1">4. Contextual AI Assistance</h4>
                <p className="text-sm text-gray-700">
                  LLM prompts explicitly consider user context (decision fatigue, time constraints, food waste concerns).
                </p>
              </div>
            </div>
          </div>

          {/* Grounded in Research */}
          <div className="bg-green-50 p-6 rounded-lg border-2 border-green-300">
            <h3 className="font-bold text-green-900 mb-3">Grounded in Checkpoint 2 Findings</h3>
            <div className="grid md:grid-cols-2 gap-4 text-sm">
              <div className="bg-white p-3 rounded border border-green-300">
                <p className="font-semibold mb-1">Participant 1 & 2 Finding:</p>
                <p className="text-gray-700 italic mb-2">"First thought of the day: what's for dinner?"</p>
                <p className="text-gray-700">→ <strong>Solution:</strong> Context-based entry points reduce decision moments</p>
              </div>
              <div className="bg-white p-3 rounded border border-green-300">
                <p className="font-semibold mb-1">All Participants Finding:</p>
                <p className="text-gray-700 italic mb-2">"Throwing away food is like throwing money away"</p>
                <p className="text-gray-700">→ <strong>Solution:</strong> Expiring ingredients alert + "Use Soon" category</p>
              </div>
              <div className="bg-white p-3 rounded border border-green-300">
                <p className="font-semibold mb-1">Participant 1 & 2 Finding:</p>
                <p className="text-gray-700 italic mb-2">"I'm so tired of eating the same thing"</p>
                <p className="text-gray-700">→ <strong>Solution:</strong> "Something Different" + creative recipe descriptions</p>
              </div>
              <div className="bg-white p-3 rounded border border-green-300">
                <p className="font-semibold mb-1">Participant 1 & 2 Finding:</p>
                <p className="text-gray-700 italic mb-2">"MyFitnessPal is too manual and tedious"</p>
                <p className="text-gray-700">→ <strong>Solution:</strong> Passive nutrition display (no input required)</p>
              </div>
            </div>
          </div>
        </div>

        {/* Footer for Print */}
        <div className="mt-12 pt-6 border-t-2 border-gray-300 text-center text-sm text-gray-600">
          <p>CookBuddy AI Pipeline Architecture | Checkpoint 3 Prototype</p>
          <p className="mt-1">Built with React + TypeScript | LLM Integration: GPT-4 / Claude</p>
        </div>
      </div>
    </div>
  );
}
