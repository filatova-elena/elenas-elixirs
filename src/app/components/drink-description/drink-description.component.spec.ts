import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DrinkDescriptionComponent } from './drink-description.component';

describe('DrinkDescriptionComponent', () => {
  let component: DrinkDescriptionComponent;
  let fixture: ComponentFixture<DrinkDescriptionComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [DrinkDescriptionComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(DrinkDescriptionComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
