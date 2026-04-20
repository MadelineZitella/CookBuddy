import { Database, Brain, Sparkles, CheckCircle, ArrowDown } from 'lucide-react';

export function PipelineVisual() {
  return (
    <div className="w-full max-w-5xl mx-auto p-8 bg-white rounded-lg border-2 border-gray-300">
      <h2 className="text-2xl font-bold text-center mb-8">CookBuddy AI Pipeline Architecture</h2>
      
      {/* Pipeline Flow */}
      <div className="space-y-6">
        {/* Stage 1 */}
        <div className="relative">
          <div className="flex items-center gap-4 bg-blue-50 p-6 rounded-lg border-2 border-blue-300">
            <div className="flex-shrink-0 w-12 h-12 bg-blue-500 rounded-full flex items-center justify-center text-white font-bold text-lg">
              1
            </div>
            <div className="flex-1">
              <div className="flex items-center gap-2 mb-2">
                <Database className="size-5 text-blue-600" />
                <h3 className="font-bold text-blue-900">User Input Collection</h3>
              </div>
              <p className="text-sm text-blue-800">
                Inventory + Context Trigger + User Preferences
              </p>
            </div>
            <div className="bg-white p-3 rounded border border-blue-300 text-xs font-mono max-w-xs">
              [chicken (exp: 2d), zucchini (exp: 3d), rice] + "Use Soon"
            </div>
          </div>
          <div className="flex justify-center py-3">
            <ArrowDown className="size-6 text-gray-400" />
          </div>
        </div>

        {/* Stage 2 */}
        <div className="relative">
          <div className="flex items-center gap-4 bg-purple-50 p-6 rounded-lg border-2 border-purple-300">
            <div className="flex-shrink-0 w-12 h-12 bg-purple-500 rounded-full flex items-center justify-center text-white font-bold text-lg">
              2
            </div>
            <div className="flex-1">
              <div className="flex items-center gap-2 mb-2">
                <Brain className="size-5 text-purple-600" />
                <h3 className="font-bold text-purple-900">Context Analysis (LLM 1)</h3>
              </div>
              <p className="text-sm text-purple-800">
                GPT-4/Claude: Extract priorities & constraints
              </p>
            </div>
            <div className="bg-white p-3 rounded border border-purple-300 text-xs font-mono max-w-xs">
              Priority: [chicken, zucchini]<br/>
              Cuisines: [Asian, Med]
            </div>
          </div>
          <div className="flex justify-center py-3">
            <ArrowDown className="size-6 text-gray-400" />
          </div>
        </div>

        {/* Stage 3 */}
        <div className="relative">
          <div className="flex items-center gap-4 bg-green-50 p-6 rounded-lg border-2 border-green-300">
            <div className="flex-shrink-0 w-12 h-12 bg-green-500 rounded-full flex items-center justify-center text-white font-bold text-lg">
              3
            </div>
            <div className="flex-1">
              <div className="flex items-center gap-2 mb-2">
                <Sparkles className="size-5 text-green-600" />
                <h3 className="font-bold text-green-900">Recipe Generation (LLM 2)</h3>
              </div>
              <p className="text-sm text-green-800">
                GPT-4/Claude: Create personalized recipes with empathetic tone
              </p>
            </div>
            <div className="bg-white p-3 rounded border border-green-300 text-xs font-mono max-w-xs">
              "Thai Ginger Chicken Bowl -<br/>
              A fresh twist on..."
            </div>
          </div>
          <div className="flex justify-center py-3">
            <ArrowDown className="size-6 text-gray-400" />
          </div>
        </div>

        {/* Stage 4 */}
        <div className="relative">
          <div className="flex items-center gap-4 bg-orange-50 p-6 rounded-lg border-2 border-orange-300">
            <div className="flex-shrink-0 w-12 h-12 bg-orange-500 rounded-full flex items-center justify-center text-white font-bold text-lg">
              4
            </div>
            <div className="flex-1">
              <div className="flex items-center gap-2 mb-2">
                <Brain className="size-5 text-orange-600" />
                <h3 className="font-bold text-orange-900">Nutrition Analysis (LLM 3)</h3>
              </div>
              <p className="text-sm text-orange-800">
                GPT-4: Estimate nutrition for passive awareness
              </p>
            </div>
            <div className="bg-white p-3 rounded border border-orange-300 text-xs font-mono max-w-xs">
              Cal: 425, P: 38g,<br/>
              C: 42g, F: 12g
            </div>
          </div>
          <div className="flex justify-center py-3">
            <ArrowDown className="size-6 text-gray-400" />
          </div>
        </div>

        {/* Stage 5 */}
        <div className="relative">
          <div className="flex items-center gap-4 bg-indigo-50 p-6 rounded-lg border-2 border-indigo-300">
            <div className="flex-shrink-0 w-12 h-12 bg-indigo-500 rounded-full flex items-center justify-center text-white font-bold text-lg">
              5
            </div>
            <div className="flex-1">
              <div className="flex items-center gap-2 mb-2">
                <CheckCircle className="size-5 text-indigo-600" />
                <h3 className="font-bold text-indigo-900">Presentation Layer</h3>
              </div>
              <p className="text-sm text-indigo-800">
                UI Display: Recipe cards + nutrition + ingredient matching
              </p>
            </div>
            <div className="bg-white p-3 rounded border border-indigo-300 text-xs max-w-xs">
              Suggest, don't prescribe.<br/>
              User maintains control.
            </div>
          </div>
        </div>
      </div>

      {/* Key Design Principles */}
      <div className="mt-8 pt-6 border-t-2 border-gray-300">
        <h3 className="font-bold text-center mb-4">Key Design Principles</h3>
        <div className="grid grid-cols-2 gap-4 text-sm">
          <div className="bg-gray-50 p-3 rounded border border-gray-200">
            <span className="font-semibold">Multi-Stage LLM:</span> Specialized prompts for each task
          </div>
          <div className="bg-gray-50 p-3 rounded border border-gray-200">
            <span className="font-semibold">Context-Aware:</span> Acknowledges decision & food fatigue
          </div>
          <div className="bg-gray-50 p-3 rounded border border-gray-200">
            <span className="font-semibold">Passive Collection:</span> Works with partial data
          </div>
          <div className="bg-gray-50 p-3 rounded border border-gray-200">
            <span className="font-semibold">User Control:</span> Suggestions, not prescriptions
          </div>
        </div>
      </div>
    </div>
  );
}
