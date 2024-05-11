import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PoliticianComponent } from './politician.component';

describe('PoliticianComponent', () => {
  let component: PoliticianComponent;
  let fixture: ComponentFixture<PoliticianComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [PoliticianComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(PoliticianComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
