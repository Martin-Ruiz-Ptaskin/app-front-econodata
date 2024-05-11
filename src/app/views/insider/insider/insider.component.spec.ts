import { ComponentFixture, TestBed } from '@angular/core/testing';

import { InsiderComponent } from './insider.component';

describe('InsiderComponent', () => {
  let component: InsiderComponent;
  let fixture: ComponentFixture<InsiderComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [InsiderComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(InsiderComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
