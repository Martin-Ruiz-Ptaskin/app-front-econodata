import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PoliticianListComponent } from './politician-list.component';

describe('PoliticianListComponent', () => {
  let component: PoliticianListComponent;
  let fixture: ComponentFixture<PoliticianListComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [PoliticianListComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(PoliticianListComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
