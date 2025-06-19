import { Component, Input, Output, EventEmitter } from '@angular/core';
import { ItemGridComponent, ItemGridEntry } from '../item-grid/item-grid.component';
import { SectionHeaderComponent } from '../section-header/section-header.component';

@Component({
  selector: 'app-flavor-grid',
  standalone: true,
  imports: [ItemGridComponent, SectionHeaderComponent],
  templateUrl: './flavor-grid.component.html',
  styleUrls: ['./flavor-grid.component.scss']
})
export class FlavorGridComponent {
  @Input() selectedFlavors: string[] = [];
  @Output() selectedFlavorsChange = new EventEmitter<string[]>();

  flavors: ItemGridEntry[] = [
    { key: 'tropical', emoji: '🌺', name: 'Tropical' },
    { key: 'fruity', emoji: '🍓', name: 'Fruity' },
    { key: 'crisp', emoji: '🍃', name: 'Crisp' },
    { key: 'herbal', emoji: '🌿', name: 'Herbal' },
    { key: 'earthy', emoji: '🌱', name: 'Earthy' },
    { key: 'spicy', emoji: '🌶️', name: 'Spicy' },
    { key: 'chocolaty', emoji: '🍫', name: 'Chocolaty' },
    { key: 'basic', emoji: '💎', name: 'Basic' }
  ];

  handleSelectedKeysChange(keys: string[]) {
    this.selectedFlavorsChange.emit(keys);
  }
}
