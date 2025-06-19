import { Component } from '@angular/core';

// Import all child components used in the template
import { HeaderComponent } from './components/header/header.component';
import { FlavorGridComponent } from './components/flavor-grid/flavor-grid.component';
import { FancinessSliderComponent } from './components/fanciness-slider/fanciness-slider.component';
import { AlcoholSelectorComponent } from './components/alcohol-selector/alcohol-selector.component';
import { MoodMeterComponent } from './components/mood-meter/mood-meter.component';
import { DrinkDescriptionComponent } from './components/drink-description/drink-description.component';
import { CocktailPreviewComponent } from './components/cocktail-preview/cocktail-preview.component';
import { GenerateButtonComponent } from './components/generate-button/generate-button.component';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [
    HeaderComponent,
    FlavorGridComponent,
    FancinessSliderComponent,
    AlcoholSelectorComponent,
    MoodMeterComponent,
    DrinkDescriptionComponent,
    CocktailPreviewComponent,
    GenerateButtonComponent,
  ],
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {
  // State for user selections
  selectedFlavors: string[] = [];
  fanciness: number = 5;
  selectedAlcohols: string[] = [];
  selectedMoods: string[] = [];
  description: string = '';
  isGenerating: boolean = false;
  isFavorited: boolean = false;

  // For favorites-sharing (can be updated after generation)
  cocktailId: string = '';
  shareDescription: string = "Check out my mystical cocktail from Elena's Elixirs!";

  // Handlers for child component outputs
  onSelectedFlavorsChange(flavors: string[]) {
    this.selectedFlavors = flavors;
  }

  onFancinessChange(fanciness: number) {
    this.fanciness = fanciness;
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
    this.isGenerating = true;
    // Simulate API call (replace with real API integration)
    setTimeout(() => {
      this.isGenerating = false;
      // Optionally update cocktailId, shareUrl, shareDescription here
    }, 1500);
  }
}
