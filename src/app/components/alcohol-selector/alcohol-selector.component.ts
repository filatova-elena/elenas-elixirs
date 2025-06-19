import { Component, Input, Output, EventEmitter } from '@angular/core';
import { ItemGridComponent, ItemGridEntry } from '../item-grid/item-grid.component';
import { SectionHeaderComponent } from '../section-header/section-header.component';

@Component({
  selector: 'app-alcohol-selector',
  standalone: true,
  imports: [ItemGridComponent, SectionHeaderComponent],
  templateUrl: './alcohol-selector.component.html',
  styleUrls: ['./alcohol-selector.component.scss']
})
export class AlcoholSelectorComponent {
  @Input() selectedAlcohols: string[] = [];
  @Output() selectedAlcoholsChange = new EventEmitter<string[]>();

  alcoholTypes: ItemGridEntry[] = [
    { key: 'champagne', emoji: '🍾', name: 'Champagne' },
    { key: 'whiskey', emoji: '🥃', name: 'Whiskey' },
    { key: 'gin', emoji: '🍸', name: 'Gin' },
    { key: 'tequila', emoji: '🌵', name: 'Tequila' },
    { key: 'rum', emoji: '🍹', name: 'Rum' },
    { key: 'vodka', emoji: '❄️', name: 'Vodka' },
    { key: 'sake', emoji: '🍶', name: 'Sake' }
  ];

  handleSelectedKeysChange(keys: string[]) {
    this.selectedAlcoholsChange.emit(keys);
  }
}
