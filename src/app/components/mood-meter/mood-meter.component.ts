// src/app/components/mood-meter/mood-meter.component.ts

import { Component, Input, Output, EventEmitter } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ImageGridComponent, ImageGridEntry } from '../image-grid/image-grid.component';
import { SectionHeaderComponent } from '../section-header/section-header.component';
import { MoodCreatureType, MoodSet, MOOD_SETS } from '../../models/mood.types';

@Component({
  selector: 'app-mood-meter',
  standalone: true,
  imports: [CommonModule, ImageGridComponent, SectionHeaderComponent],
  templateUrl: './mood-meter.component.html',
  styleUrls: ['./mood-meter.component.scss']
})
export class MoodMeterComponent {
  @Input() selectedMoods: string[] = [];
  @Input() selectedCreatureType: MoodCreatureType = 'cat'; // Default to cats for now
  @Output() selectedMoodsChange = new EventEmitter<string[]>();

  get currentMoodSet(): MoodSet {
    return MOOD_SETS[this.selectedCreatureType];
  }

  get moods(): ImageGridEntry[] {
    return this.currentMoodSet.moods
      .filter(mood => mood.image) // Only show moods that have images
      .map(mood => ({
        key: mood.key,
        name: mood.name,
        image: mood.image!,
        description: mood.description
      }));
  }

  get sectionTitle(): string {
    return `${this.currentMoodSet.displayName} Alignment`;
  }

  get sectionIcon(): string {
    return this.currentMoodSet.icon;
  }

  handleSelectedKeysChange(keys: string[]) {
    this.selectedMoodsChange.emit(keys);
  }
}