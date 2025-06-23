// src/app/components/image-grid/image-grid.component.ts

import { Component, Input, Output, EventEmitter } from '@angular/core';
import { CommonModule } from '@angular/common';

export interface ImageGridEntry {
  key: string;
  name: string;
  image: string;
  description?: string;
}

@Component({
  selector: 'app-image-grid',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './image-grid.component.html',
  styleUrls: ['./image-grid.component.scss']
})
export class ImageGridComponent {
  @Input() items: ImageGridEntry[] = [];
  @Input() selectedKeys: string[] = [];
  @Input() columns: number = 4;
  @Input() allowMultiple: boolean = true;
  @Output() selectedKeysChange = new EventEmitter<string[]>();

  get gridColumns(): string {
    return `repeat(${this.columns}, 1fr)`;
  }

  isSelected(key: string): boolean {
    return this.selectedKeys.includes(key);
  }

  toggleItem(key: string): void {
    let newSelection: string[];
    
    if (this.allowMultiple) {
      if (this.isSelected(key)) {
        newSelection = this.selectedKeys.filter(k => k !== key);
      } else {
        newSelection = [...this.selectedKeys, key];
      }
    } else {
      // Single selection mode
      newSelection = this.isSelected(key) ? [] : [key];
    }
    
    this.selectedKeysChange.emit(newSelection);
  }
}