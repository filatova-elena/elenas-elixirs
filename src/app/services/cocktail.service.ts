import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Cocktail } from '../models/cocktail.model';

export interface CocktailRequest {
  flavors?: string[];
  fanciness?: number;
  alcoholTypes?: string[];
  mood?: string[];
  description?: string;
}

export interface CocktailResponse {
  success: boolean;
  cocktail?: {
    name: string;
    description: string;
    ingredients: Array<{item: string, amount: string}>;
    instructions: string[];
    glassware: string;
    garnish: string;
    difficulty: string;
    prepTime: string;
    mysticalNote: string;
    brewedAt: string;
    elenasSeal: string;
  };
  error?: string;
  details?: string;
}

@Injectable({
  providedIn: 'root'
})
export class CocktailService {
  private apiUrl = 'https://m58xxc6obf.execute-api.us-east-1.amazonaws.com/dev';

  // Store the current cocktail for previewing
  private currentCocktail: Cocktail | null = null;

  constructor(private http: HttpClient) {}

  setCurrentCocktail(cocktail: Cocktail) {
    this.currentCocktail = cocktail;
  }

  getCurrentCocktail(): Cocktail | null {
    return this.currentCocktail;
  }

  generateCocktail(preferences: CocktailRequest): Observable<CocktailResponse> {
    const headers = new HttpHeaders({
      'Content-Type': 'application/json'
    });

    console.log('🧙‍♀️ Calling Elena\'s API:', `${this.apiUrl}/cocktail-generator`);
    console.log('With preferences:', preferences);

    return this.http.post<CocktailResponse>(
      `${this.apiUrl}/cocktail-generator`,
      preferences,
      { headers }
    );
  }

  // Test endpoint to check if API is working
  testConnection(): Observable<any> {
    return this.http.get(`${this.apiUrl}/cocktail-generator`);
  }
}