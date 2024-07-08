import { TestBed } from '@angular/core/testing';

import { FoundListServiceService } from './found-list-service.service';

describe('FoundListServiceService', () => {
  let service: FoundListServiceService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(FoundListServiceService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
