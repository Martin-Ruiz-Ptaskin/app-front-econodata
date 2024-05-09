import { ComponentFixture, TestBed } from '@angular/core/testing';

import { HorizonteComponent } from './horizonte.component';

describe('HorizonteComponent', () => {
  let component: HorizonteComponent;
  let fixture: ComponentFixture<HorizonteComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [HorizonteComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(HorizonteComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
