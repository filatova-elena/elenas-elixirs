import { Component, Input, Output, EventEmitter } from '@angular/core';
import { CommonModule } from '@angular/common';
import { SectionHeaderComponent } from '../section-header/section-header.component';

@Component({
  selector: 'app-fanciness-slider',
  standalone: true,
  imports: [CommonModule, SectionHeaderComponent],
  templateUrl: './fanciness-slider.component.html',
  styleUrls: ['./fanciness-slider.component.scss']
})
export class FancinessSliderComponent {
  @Input() fanciness: number = 5;
  @Output() fancinessChange = new EventEmitter<number>();

  fancyTexts: string[] = [
    "Simple & Rustic", "Casual", "Relaxed", "Pleasant", "Moderate",
    "Moderately Sophisticated", "Refined", "Elegant", "Luxurious", "Extraordinarily Fancy"
  ];

  get fancinessText(): string {
    return this.fancyTexts[this.fanciness - 1] || '';
  }

  onFancinessChange(event: Event) {
    const value = Number((event.target as HTMLInputElement).value);
    this.fanciness = value;
    this.fancinessChange.emit(this.fanciness);
  }
}
