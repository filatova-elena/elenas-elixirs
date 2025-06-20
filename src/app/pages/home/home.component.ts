import { Component } from '@angular/core';
import { Router } from '@angular/router';

// Import all child components used in the template
import { AlcoholSelectorComponent } from '../../components/alcohol-selector/alcohol-selector.component';
import { CocktailPreviewComponent } from '../../components/cocktail-preview/cocktail-preview.component';
import { DrinkDescriptionComponent } from '../../components/drink-description/drink-description.component';
import { FancinessSliderComponent } from '../../components/fanciness-slider/fanciness-slider.component';
import { FlavorGridComponent } from '../../components/flavor-grid/flavor-grid.component';
import { AppButtonComponent } from '../../components/app-button/app-button.component';
import { MoodMeterComponent } from '../../components/mood-meter/mood-meter.component';

// Import necessary models and services
import { Cocktail } from '../../models/cocktail.model';
import { CocktailService, CocktailRequest, CocktailResponse } from '../../services/cocktail.service';
import { LocalStorageService } from '../../services/local-storage.service';

@Component({
  selector: 'app-home',
  standalone: true,
  imports: [
    AlcoholSelectorComponent,
    CocktailPreviewComponent,
    DrinkDescriptionComponent,
    FancinessSliderComponent,
    FlavorGridComponent,
    AppButtonComponent,
    MoodMeterComponent,
  ],
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent {
  // State for user selections
  description: string = '';
  isGenerating: boolean = false;
  selectedAlcohols: string[] = [];
  selectedFanciness: number = 5;
  selectedFlavors: string[] = [];
  selectedMoods: string[] = [];
  
  // Error handling
  error: string = '';

  constructor(
    private cocktailService: CocktailService,
    private localStorageService: LocalStorageService,
    private router: Router
  ) {}

  // Handlers for child component outputs
  onSelectedFlavorsChange(flavors: string[]) {
    this.selectedFlavors = flavors;
  }

  onFancinessChange(fanciness: number) {
    this.selectedFanciness = fanciness;
  }

  onSelectedAlcoholsChange(alcohols: string[]) {
    this.selectedAlcohols = alcohols;
  }

  onSelectedMoodsChange(moods: string[]) {
    this.selectedMoods = moods;
  }

  onDescriptionChange(description: string) {
    this.description = description;
  }

  onGenerateCocktail() {
    this.generateCocktail();
  }

  // Generate cocktail and navigate to recipe page
  generateCocktail() {
    this.isGenerating = true;
    this.error = '';

    const preferences: CocktailRequest = {
      alcoholTypes: this.selectedAlcohols,
      description: this.description,
      fanciness: this.selectedFanciness,
      flavors: this.selectedFlavors,
      mood: this.selectedMoods,
    };

    console.log('🧙‍♀️ Elena is brewing your magical elixir...', preferences);

    this.cocktailService.generateCocktail(preferences).subscribe({
      next: (response: CocktailResponse) => {
        this.isGenerating = false;
        if (response.success) {
          const generatedCocktail = new Cocktail(response.cocktail);
          console.log('✨ Cocktail brewed successfully!', generatedCocktail);
          
          // Store the cocktail in localStorage
          this.localStorageService.setCurrentCocktail(generatedCocktail);
          
          // Navigate to recipe page
          this.router.navigate(['/recipe']);
        } else {
          this.error = response.error || 'Failed to generate cocktail';
        }
      },
      error: (err) => {
        this.isGenerating = false;
        this.error = 'Network error - check your connection';
        console.error('Error calling API:', err);
      }
    });
  }
}