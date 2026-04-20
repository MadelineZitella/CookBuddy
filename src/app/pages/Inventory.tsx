import { useState } from 'react';
import { useNavigate } from 'react-router';
import { ArrowLeft, ChefHat, Plus, Trash2, AlertCircle, Sparkles, Loader2 } from 'lucide-react';
import { Button } from '../components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '../components/ui/card';
import { Badge } from '../components/ui/badge';
import { Input } from '../components/ui/input';
import { Label } from '../components/ui/label';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '../components/ui/select';
import { mockInventory, type Ingredient } from '../data/mockData';
import { suggestInventoryItems } from '../lib/ai';
import { toast } from 'sonner';

const CATEGORY_EMOJIS: Record<string, string> = {
  protein: '🥩', vegetable: '🥦', grain: '🌾', dairy: '🧀', pantry: '🫙', other: '📦'
};

export function Inventory() {
  const navigate = useNavigate();
  const [inventory, setInventory] = useState<Ingredient[]>(mockInventory);
  const [showAddForm, setShowAddForm] = useState(false);
  const [aiSuggestion, setAiSuggestion] = useState('');
  const [aiLoading, setAiLoading] = useState(false);
  const [newItem, setNewItem] = useState({
    name: '', quantity: '', daysUntilExpiry: '',
    category: 'other' as Ingredient['category']
  });

  const handleAddItem = () => {
    if (!newItem.name || !newItem.quantity) {
      toast.error('Please fill in item name and quantity');
      return;
    }
    const item: Ingredient = {
      id: String(Date.now()),
      name: newItem.name,
      quantity: newItem.quantity,
      category: newItem.category,
      ...(newItem.daysUntilExpiry && { daysUntilExpiry: parseInt(newItem.daysUntilExpiry) })
    };
    setInventory([...inventory, item]);
    setNewItem({ name: '', quantity: '', daysUntilExpiry: '', category: 'other' });
    setShowAddForm(false);
    toast.success('Ingredient added to your inventory');
  };

  const handleRemoveItem = (id: string) => {
    setInventory(inventory.filter(item => item.id !== id));
    toast.success('Ingredient removed');
  };

  const handleGetAISuggestions = async () => {
    setAiLoading(true);
    setAiSuggestion('');
    try {
      const suggestion = await suggestInventoryItems(inventory.map(i => i.name));
      setAiSuggestion(suggestion);
    } catch {
      toast.error('Could not get AI suggestions right now');
    } finally {
      setAiLoading(false);
    }
  };

  const expiringItems = inventory.filter(item => item.daysUntilExpiry && item.daysUntilExpiry <= 3);
  const categorizedInventory = inventory.reduce((acc, item) => {
    if (!acc[item.category]) acc[item.category] = [];
    acc[item.category].push(item);
    return acc;
  }, {} as Record<string, Ingredient[]>);

  return (
    <div className="min-h-screen bg-gradient-to-br from-orange-50 via-white to-green-50">
      <header className="border-b bg-white/80 backdrop-blur-sm sticky top-0 z-10">
        <div className="container mx-auto px-4 py-4 flex items-center gap-4">
          <Button variant="ghost" size="icon" onClick={() => navigate('/')}>
            <ArrowLeft className="size-5" />
          </Button>
          <div className="flex items-center gap-2">
            <ChefHat className="size-8 text-orange-600" />
            <h1 className="text-2xl font-bold text-gray-900">My Inventory</h1>
          </div>
        </div>
      </header>

      <main className="container mx-auto px-4 py-8 max-w-4xl">
        {/* Stats */}
        <div className="grid grid-cols-3 gap-4 mb-6">
          <Card className="text-center">
            <CardContent className="pt-6">
              <p className="text-3xl font-bold text-orange-600">{inventory.length}</p>
              <p className="text-sm text-gray-600">Total Items</p>
            </CardContent>
          </Card>
          <Card className="text-center border-orange-200">
            <CardContent className="pt-6">
              <p className="text-3xl font-bold text-orange-500">{expiringItems.length}</p>
              <p className="text-sm text-gray-600">Expiring Soon</p>
            </CardContent>
          </Card>
          <Card className="text-center border-green-200">
            <CardContent className="pt-6">
              <p className="text-3xl font-bold text-green-600">{Object.keys(categorizedInventory).length}</p>
              <p className="text-sm text-gray-600">Categories</p>
            </CardContent>
          </Card>
        </div>

        {/* Expiring Alert */}
        {expiringItems.length > 0 && (
          <Card className="mb-6 border-orange-200 bg-orange-50">
            <CardHeader className="pb-3">
              <div className="flex items-start gap-3">
                <AlertCircle className="size-5 text-orange-600 mt-0.5" />
                <div>
                  <CardTitle className="text-lg">Use Soon</CardTitle>
                  <CardDescription>
                    {expiringItems.length} ingredient{expiringItems.length !== 1 ? 's' : ''} expiring in the next 3 days
                  </CardDescription>
                </div>
              </div>
            </CardHeader>
            <CardContent>
              <div className="flex flex-wrap gap-2 mb-3">
                {expiringItems.map(item => (
                  <Badge key={item.id} variant="secondary" className="bg-orange-100">
                    {item.name} ({item.daysUntilExpiry}d)
                  </Badge>
                ))}
              </div>
              <Button size="sm" variant="outline" className="border-orange-300 text-orange-700 hover:bg-orange-100" onClick={() => navigate('/')}>
                Find recipes using these →
              </Button>
            </CardContent>
          </Card>
        )}

        {/* AI Suggestions */}
        <Card className="mb-6 border-purple-200 bg-purple-50">
          <CardHeader className="pb-3">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-2">
                <Sparkles className="size-5 text-purple-600" />
                <CardTitle className="text-lg">AI Pantry Suggestions</CardTitle>
              </div>
              <Button size="sm" variant="outline" className="border-purple-300 text-purple-700" onClick={handleGetAISuggestions} disabled={aiLoading}>
                {aiLoading ? <Loader2 className="size-4 animate-spin" /> : <Sparkles className="size-4 mr-1" />}
                {aiLoading ? 'Thinking...' : 'Get Suggestions'}
              </Button>
            </div>
          </CardHeader>
          {aiSuggestion && (
            <CardContent>
              <p className="text-sm text-purple-800">{aiSuggestion}</p>
            </CardContent>
          )}
        </Card>

        {/* Add Item Button */}
        <div className="mb-6">
          <Button onClick={() => setShowAddForm(!showAddForm)} className="bg-orange-600 hover:bg-orange-700">
            <Plus className="size-4 mr-2" />
            Add Ingredient
          </Button>
        </div>

        {/* Add Item Form */}
        {showAddForm && (
          <Card className="mb-6 border-orange-200">
            <CardHeader>
              <CardTitle>Add New Ingredient</CardTitle>
              <CardDescription>Add items to track your pantry and get better recipe suggestions</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="grid gap-4">
                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <Label htmlFor="name">Ingredient Name</Label>
                    <Input id="name" placeholder="e.g., Chicken breast" value={newItem.name}
                      onChange={e => setNewItem({ ...newItem, name: e.target.value })} />
                  </div>
                  <div>
                    <Label htmlFor="quantity">Quantity</Label>
                    <Input id="quantity" placeholder="e.g., 2 pieces" value={newItem.quantity}
                      onChange={e => setNewItem({ ...newItem, quantity: e.target.value })} />
                  </div>
                </div>
                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <Label htmlFor="category">Category</Label>
                    <Select value={newItem.category} onValueChange={v => setNewItem({ ...newItem, category: v as Ingredient['category'] })}>
                      <SelectTrigger id="category"><SelectValue /></SelectTrigger>
                      <SelectContent>
                        {['protein', 'vegetable', 'grain', 'dairy', 'pantry', 'other'].map(c => (
                          <SelectItem key={c} value={c}>{CATEGORY_EMOJIS[c]} {c.charAt(0).toUpperCase() + c.slice(1)}</SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                  </div>
                  <div>
                    <Label htmlFor="expiry">Days Until Expiry (optional)</Label>
                    <Input id="expiry" type="number" placeholder="e.g., 5" value={newItem.daysUntilExpiry}
                      onChange={e => setNewItem({ ...newItem, daysUntilExpiry: e.target.value })} />
                  </div>
                </div>
                <div className="flex gap-3">
                  <Button onClick={handleAddItem}>Add Ingredient</Button>
                  <Button variant="outline" onClick={() => setShowAddForm(false)}>Cancel</Button>
                </div>
              </div>
            </CardContent>
          </Card>
        )}

        {/* Inventory by Category */}
        <div className="space-y-6">
          {Object.entries(categorizedInventory).map(([category, items]) => (
            <Card key={category}>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <span>{CATEGORY_EMOJIS[category]}</span>
                  <span className="capitalize">{category}</span>
                </CardTitle>
                <CardDescription>{items.length} item{items.length !== 1 ? 's' : ''}</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-2">
                  {items.map(item => (
                    <div key={item.id} className="flex items-center justify-between p-3 bg-gray-50 rounded-lg hover:bg-gray-100 transition-colors">
                      <div className="flex-1">
                        <p className="font-medium text-gray-900">{item.name}</p>
                        <p className="text-sm text-gray-600">{item.quantity}</p>
                      </div>
                      <div className="flex items-center gap-3">
                        {item.daysUntilExpiry !== undefined && (
                          <Badge variant="secondary"
                            className={item.daysUntilExpiry <= 3 ? 'bg-orange-100 text-orange-700' : 'bg-green-100 text-green-700'}>
                            {item.daysUntilExpiry}d
                          </Badge>
                        )}
                        <Button variant="ghost" size="icon" onClick={() => handleRemoveItem(item.id)}>
                          <Trash2 className="size-4 text-red-400" />
                        </Button>
                      </div>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
      </main>
    </div>
  );
}
