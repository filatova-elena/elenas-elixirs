import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CocktailPreviewComponent } from './cocktail-preview.component';

describe('CocktailPreviewComponent', () => {
  let component: CocktailPreviewComponent;
  let fixture: ComponentFixture<CocktailPreviewComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [CocktailPreviewComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(CocktailPreviewComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
