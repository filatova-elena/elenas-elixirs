import { Injectable } from '@angular/core';
import { Cocktail } from '../models/cocktail.model';

@Injectable({
  providedIn: 'root'
})
export class LocalStorageService {
  private readonly CURRENT_COCKTAIL_KEY = 'elenas_current_cocktail';
  private readonly COCKTAIL_HISTORY_KEY = 'elenas_cocktail_history';
  private readonly FAVORITES_KEY = 'elenas_favorites';

  constructor() {}

  // Current cocktail methods
  setCurrentCocktail(cocktail: Cocktail): void {
    try {
      const cocktailData = {
        ...cocktail,
        timestamp: new Date().toISOString()
      };
      localStorage.setItem(this.CURRENT_COCKTAIL_KEY, JSON.stringify(cocktailData));
      
      // Also add to history
      this.addToHistory(cocktail);
    } catch (error) {
      console.error('Error saving cocktail to localStorage:', error);
    }
  }

  getCurrentCocktail(): Cocktail | null {
    try {
      const stored = localStorage.getItem(this.CURRENT_COCKTAIL_KEY);
      if (!stored) return null;
      
      const cocktailData = JSON.parse(stored);
      // Convert back to Cocktail instance
      return new Cocktail(cocktailData);
    } catch (error) {
      console.error('Error retrieving cocktail from localStorage:', error);
      return null;
    }
  }

  clearCurrentCocktail(): void {
    try {
      localStorage.removeItem(this.CURRENT_COCKTAIL_KEY);
    } catch (error) {
      console.error('Error clearing current cocktail:', error);
    }
  }

  // History methods (for future features like "recently brewed")
  private addToHistory(cocktail: Cocktail): void {
    try {
      const history = this.getCocktailHistory();
      const cocktailWithTimestamp = {
        ...cocktail,
        timestamp: new Date().toISOString()
      };
      
      // Add to beginning, keep last 10
      history.unshift(cocktailWithTimestamp);
      const limitedHistory = history.slice(0, 10);
      
      localStorage.setItem(this.COCKTAIL_HISTORY_KEY, JSON.stringify(limitedHistory));
    } catch (error) {
      console.error('Error adding to cocktail history:', error);
    }
  }

  getCocktailHistory(): any[] {
    try {
      const stored = localStorage.getItem(this.COCKTAIL_HISTORY_KEY);
      return stored ? JSON.parse(stored) : [];
    } catch (error) {
      console.error('Error retrieving cocktail history:', error);
      return [];
    }
  }

  // Favorites methods (for future features)
  addToFavorites(cocktail: Cocktail): void {
    try {
      const favorites = this.getFavorites();
      const cocktailWithId = {
        ...cocktail,
        id: this.generateId(),
        favoriteDate: new Date().toISOString()
      };
      
      favorites.push(cocktailWithId);
      localStorage.setItem(this.FAVORITES_KEY, JSON.stringify(favorites));
    } catch (error) {
      console.error('Error adding to favorites:', error);
    }
  }

  getFavorites(): any[] {
    try {
      const stored = localStorage.getItem(this.FAVORITES_KEY);
      return stored ? JSON.parse(stored) : [];
    } catch (error) {
      console.error('Error retrieving favorites:', error);
      return [];
    }
  }

  removeFromFavorites(cocktailId: string): void {
    try {
      const favorites = this.getFavorites();
      const filtered = favorites.filter(fav => fav.id !== cocktailId);
      localStorage.setItem(this.FAVORITES_KEY, JSON.stringify(filtered));
    } catch (error) {
      console.error('Error removing from favorites:', error);
    }
  }

  // Utility methods
  private generateId(): string {
    return Date.now().toString(36) + Math.random().toString(36).substr(2);
  }

  // Check if localStorage is available
  isStorageAvailable(): boolean {
    try {
      const test = '__storage_test__';
      localStorage.setItem(test, test);
      localStorage.removeItem(test);
      return true;
    } catch {
      return false;
    }
  }

  // Clear all Elena's data
  clearAllData(): void {
    try {
      localStorage.removeItem(this.CURRENT_COCKTAIL_KEY);
      localStorage.removeItem(this.COCKTAIL_HISTORY_KEY);
      localStorage.removeItem(this.FAVORITES_KEY);
    } catch (error) {
      console.error('Error clearing all data:', error);
    }
  }
}