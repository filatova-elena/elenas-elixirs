import { Component, Input, Output, EventEmitter } from '@angular/core';
import { ItemGridComponent, ItemGridEntry } from '../item-grid/item-grid.component';
import { SectionHeaderComponent } from '../section-header/section-header.component';

@Component({
  selector: 'app-mood-meter',
  standalone: true,
  imports: [ItemGridComponent, SectionHeaderComponent],
  templateUrl: './mood-meter.component.html',
  styleUrls: ['./mood-meter.component.scss']
})
export class MoodMeterComponent {
  @Input() selectedMoods: string[] = [];
  @Output() selectedMoodsChange = new EventEmitter<string[]>();

  moods: ItemGridEntry[] = [
    { key: 'transcendent', emoji: '🌌', name: 'Transcendent' },
    { key: 'mysterious', emoji: '🌙', name: 'Mysterious' },
    { key: 'energetic', emoji: '⚡', name: 'Energetic' },
    { key: 'contemplative', emoji: '🔮', name: 'Contemplative' },
    { key: 'passionate', emoji: '🔥', name: 'Passionate' },
    { key: 'serene', emoji: '🕊️', name: 'Serene' }
  ];

  handleSelectedKeysChange(keys: string[]) {
    this.selectedMoodsChange.emit(keys);
  }
}
