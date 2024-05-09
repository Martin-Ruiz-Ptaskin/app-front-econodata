import { ComponentFixture, TestBed } from '@angular/core/testing';

import { InflacionComponent } from './inflacion.component';

describe('InflacionComponent', () => {
  let component: InflacionComponent;
  let fixture: ComponentFixture<InflacionComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [InflacionComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(InflacionComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
