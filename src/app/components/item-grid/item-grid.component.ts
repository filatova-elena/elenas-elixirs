import { Component, Input, Output, EventEmitter } from '@angular/core';
import { CommonModule } from '@angular/common';

export interface ItemGridEntry {
  key: string;
  emoji: string;
  name: string;
}

@Component({
  selector: 'app-item-grid',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './item-grid.component.html',
  styleUrls: ['./item-grid.component.scss']
})
export class ItemGridComponent {
  @Input() items: ItemGridEntry[] = [];
  @Input() selectedKeys: string[] = [];
  @Output() selectedKeysChange = new EventEmitter<string[]>();
  @Input() columns = 4; // You can override this when using the component

  toggleItem(key: string) {
    const idx = this.selectedKeys.indexOf(key);
    if (idx === -1) {
      this.selectedKeys = [...this.selectedKeys, key];
    } else {
      this.selectedKeys = this.selectedKeys.filter(k => k !== key);
    }
    this.selectedKeysChange.emit(this.selectedKeys);
  }
}
