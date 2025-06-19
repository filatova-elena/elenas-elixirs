import { Component, Input, Output, EventEmitter } from '@angular/core';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-generate-button',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './generate-button.component.html',
  styleUrls: ['./generate-button.component.scss']
})
export class GenerateButtonComponent {
  @Input() loading: boolean = false;
  @Output() generate = new EventEmitter<void>();

  handleClick() {
    if (!this.loading) {
      this.generate.emit();
    }
  }
}
