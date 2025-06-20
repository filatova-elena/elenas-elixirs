import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CocktailDisplayComponent } from './cocktail-display.component';

describe('CocktailDisplayComponent', () => {
  let component: CocktailDisplayComponent;
  let fixture: ComponentFixture<CocktailDisplayComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [CocktailDisplayComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(CocktailDisplayComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
