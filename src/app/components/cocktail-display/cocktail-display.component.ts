// src/app/cocktail-display/cocktail-display.component.ts

import { Component, Input } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Cocktail } from '../../models/cocktail.model';

@Component({
  selector: 'app-cocktail-display',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './cocktail-display.component.html',
  styleUrl: './cocktail-display.component.scss'
})
export class CocktailDisplayComponent {
  @Input() cocktail: Cocktail | null = null;

  shareCocktail() {
    if (!this.cocktail) return;
    
    const shareText = `🍹 ${this.cocktail.name}\n${this.cocktail.description}\n\nBrewed by Elena's Elixirs ✨`;
    
    if (navigator.share) {
      navigator.share({
        title: this.cocktail.name,
        text: shareText,
        url: window.location.href
      });
    } else {
      // Fallback - copy to clipboard
      navigator.clipboard.writeText(shareText);
      // You could add a toast notification here
    }
  }
}