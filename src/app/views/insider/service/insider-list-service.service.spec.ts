import { TestBed } from '@angular/core/testing';

import { InsiderListServiceService } from './insider-list-service.service';

describe('InsiderListServiceService', () => {
  let service: InsiderListServiceService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(InsiderListServiceService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
