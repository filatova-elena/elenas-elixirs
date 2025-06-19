import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AlcoholSelectorComponent } from './alcohol-selector.component';

describe('AlcoholSelectorComponent', () => {
  let component: AlcoholSelectorComponent;
  let fixture: ComponentFixture<AlcoholSelectorComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [AlcoholSelectorComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(AlcoholSelectorComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
