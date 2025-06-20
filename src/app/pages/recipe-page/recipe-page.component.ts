import { AppButtonComponent } from '../../components/app-button/app-button.component';
import { Cocktail } from '../../models/cocktail.model';
import { CocktailDisplayComponent } from '../../components/cocktail-display/cocktail-display.component';
import { LocalStorageService } from '../../services/local-storage.service';
import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-recipe-page',
  standalone: true,
  imports: [
    AppButtonComponent,
    CocktailDisplayComponent,
    CommonModule,
  ],
  templateUrl: './recipe-page.component.html',
  styleUrl: './recipe-page.component.scss'
})
export class RecipePageComponent implements OnInit {
  generatedCocktail: Cocktail | null = null;

  constructor(
    private localStorageService: LocalStorageService,
    private router: Router
  ) {}

  hasGeneratedCocktail(): boolean {
    // Check if a cocktail has been generated
    return this.generatedCocktail !== null;
  }

  ngOnInit() {
    // Get the cocktail from localStorage
    this.generatedCocktail = this.localStorageService.getCurrentCocktail();
  }

  // Optional: Method to go back to create another cocktail
  createAnotherElixir() {
    this.router.navigate(['/']);
  }
}