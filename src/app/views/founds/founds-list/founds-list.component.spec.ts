import { ComponentFixture, TestBed } from '@angular/core/testing';

import { FoundsListComponent } from './founds-list.component';

describe('FoundsListComponent', () => {
  let component: FoundsListComponent;
  let fixture: ComponentFixture<FoundsListComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [FoundsListComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(FoundsListComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
