import { Component, Input, Output, EventEmitter } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { SectionHeaderComponent } from '../section-header/section-header.component';

@Component({
  selector: 'app-drink-description',
  standalone: true,
  imports: [CommonModule, FormsModule, SectionHeaderComponent],
  templateUrl: './drink-description.component.html',
  styleUrls: ['./drink-description.component.scss']
})
export class DrinkDescriptionComponent {
  @Input() description: string = '';
  @Output() descriptionChange = new EventEmitter<string>();

  isListening = false;
  placeholder = 'Describe your perfect elixir...';

  toggleVoice() {
    this.isListening = !this.isListening;
    // Placeholder for real voice input logic
  }

  onDescriptionChange() {
    this.descriptionChange.emit(this.description);
  }
}
