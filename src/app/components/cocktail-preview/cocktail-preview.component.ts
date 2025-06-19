import { Component, Input, OnChanges, SimpleChanges } from '@angular/core';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-cocktail-preview',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './cocktail-preview.component.html',
  styleUrls: ['./cocktail-preview.component.scss']
})
export class CocktailPreviewComponent implements OnChanges {
  @Input() description: string = '';
  @Input() selectedFlavors: string[] = [];
  @Input() selectedAlcohols: string[] = [];
  @Input() selectedMoods: string[] = [];
  @Input() fanciness: number = 5;

  previewText: string = '';

  ngOnChanges(changes: SimpleChanges): void {
    this.updatePreview();
  }

  updatePreview() {
    if (this.description && this.description.trim().length > 0) {
      this.previewText = `✨ ${this.description} ✨`;
      return;
    }

    let preview = "A mystical elixir";

    if (this.selectedFlavors && this.selectedFlavors.length > 0) {
      preview += ` with ${this.selectedFlavors.join(' and ')} essences`;
    }

    if (this.selectedAlcohols && this.selectedAlcohols.length > 0) {
      if (this.selectedAlcohols.length === 1) {
        preview += ` featuring ${this.selectedAlcohols[0]}`;
      } else {
        preview += ` blending ${this.selectedAlcohols.join(' and ')}`;
      }
    }

    if (this.selectedMoods && this.selectedMoods.length > 0) {
      if (this.selectedMoods.length === 1) {
        preview += ` for a ${this.selectedMoods[0]} mood`;
      } else {
        preview += ` evoking ${this.selectedMoods.join(' and ')} energies`;
      }
    }

    if (this.fanciness > 7) {
      preview += ", crafted with exquisite elegance";
    } else if (this.fanciness < 4) {
      preview += ", simple and approachable";
    }

    preview += "...";
    this.previewText = preview;
  }
}
