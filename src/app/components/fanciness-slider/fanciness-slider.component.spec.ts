import { ComponentFixture, TestBed } from '@angular/core/testing';

import { FancinessSliderComponent } from './fanciness-slider.component';

describe('FancinessSliderComponent', () => {
  let component: FancinessSliderComponent;
  let fixture: ComponentFixture<FancinessSliderComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [FancinessSliderComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(FancinessSliderComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
