// app-button.component.ts
import { Component, Input, Output, EventEmitter } from '@angular/core';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-button',
  standalone: true,
  imports: [CommonModule],
  template: `
    <button
      class="app-btn"
      [class]="variant"
      [disabled]="loading || disabled"
      (click)="handleClick()"
      [type]="type"
    >
      <span *ngIf="!loading" class="btn-content">
        <span *ngIf="icon" class="btn-icon">{{ icon }}</span>
        <span class="btn-text">{{ text }}</span>
      </span>
      <span *ngIf="loading" class="btn-loading">
        <span class="loading-icon">{{ loadingIcon }}</span>
        <span class="btn-text">{{ loadingText }}</span>
      </span>
    </button>
  `,
  styleUrls: ['./app-button.component.scss']
})
export class AppButtonComponent {
  // Button content
  @Input() text: string = 'Click Me';
  @Input() icon: string = '';
  
  // Loading states
  @Input() loading: boolean = false;
  @Input() loadingText: string = 'Loading...';
  @Input() loadingIcon: string = '🔮';
  
  // Button properties
  @Input() disabled: boolean = false;
  @Input() type: 'button' | 'submit' | 'reset' = 'button';
  @Input() variant: string = 'primary'; // primary, secondary, danger, etc.
  
  // Events
  @Output() action = new EventEmitter<void>();

  handleClick() {
    if (!this.loading && !this.disabled) {
      this.action.emit();
    }
  }
}