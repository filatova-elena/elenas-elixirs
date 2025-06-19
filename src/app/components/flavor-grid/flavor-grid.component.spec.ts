import { ComponentFixture, TestBed } from '@angular/core/testing';

import { FlavorGridComponent } from './flavor-grid.component';

describe('FlavorGridComponent', () => {
  let component: FlavorGridComponent;
  let fixture: ComponentFixture<FlavorGridComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [FlavorGridComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(FlavorGridComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
