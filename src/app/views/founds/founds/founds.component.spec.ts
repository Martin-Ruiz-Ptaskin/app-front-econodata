import { ComponentFixture, TestBed } from '@angular/core/testing';

import { FoundsComponent } from './founds.component';

describe('FoundsComponent', () => {
  let component: FoundsComponent;
  let fixture: ComponentFixture<FoundsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [FoundsComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(FoundsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
