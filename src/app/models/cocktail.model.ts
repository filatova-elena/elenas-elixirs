// src/app/models/cocktail.model.ts

export interface Ingredient {
  item: string;
  amount: string;
}

export class Cocktail {
  name: string;
  description: string;
  ingredients: Ingredient[];
  instructions: string[];
  glassware: string;
  garnish: string;
  difficulty: 'Easy' | 'Medium' | 'Hard';
  prepTime: string;
  mysticalNote: string;
  brewedAt: string;
  elenasSeal: string;

  constructor(data: any) {
    this.name = data.name || 'Mysterious Elixir';
    this.description = data.description || '';
    this.ingredients = data.ingredients || [];
    this.instructions = data.instructions || [];
    this.glassware = data.glassware || 'glass';
    this.garnish = data.garnish || '';
    this.difficulty = data.difficulty || 'Medium';
    this.prepTime = data.prepTime || '5 minutes';
    this.mysticalNote = data.mysticalNote || '✨ A magical creation';
    this.brewedAt = data.brewedAt || new Date().toISOString();
    this.elenasSeal = data.elenasSeal || '✨🍹✨';
  }

  // Helper methods
  get formattedBrewTime(): string {
    return new Date(this.brewedAt).toLocaleString();
  }

  get difficultyColor(): string {
    switch (this.difficulty) {
      case 'Easy': return '#4CAF50';
      case 'Medium': return '#FF9800';
      case 'Hard': return '#F44336';
      default: return '#9C27B0';
    }
  }

  get totalIngredients(): number {
    return this.ingredients.length;
  }

  get estimatedAlcoholContent(): string {
    const alcoholIngredients = this.ingredients.filter(ing => 
      ing.item.toLowerCase().includes('gin') ||
      ing.item.toLowerCase().includes('vodka') ||
      ing.item.toLowerCase().includes('rum') ||
      ing.item.toLowerCase().includes('whiskey') ||
      ing.item.toLowerCase().includes('tequila') ||
      ing.item.toLowerCase().includes('liqueur') ||
      ing.item.toLowerCase().includes('wine') ||
      ing.item.toLowerCase().includes('brandy')
    );
    
    if (alcoholIngredients.length === 0) return 'Non-alcoholic';
    if (alcoholIngredients.length === 1) return 'Light';
    if (alcoholIngredients.length === 2) return 'Medium';
    return 'Strong';
  }
}