import { ComponentFixture, TestBed } from '@angular/core/testing';

import { MoodMeterComponent } from './mood-meter.component';

describe('MoodMeterComponent', () => {
  let component: MoodMeterComponent;
  let fixture: ComponentFixture<MoodMeterComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [MoodMeterComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(MoodMeterComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
