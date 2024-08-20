import { TestBed } from '@angular/core/testing';

import { ErrorHttpsService } from './error-https.service';

describe('ErrorHttpsService', () => {
  let service: ErrorHttpsService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(ErrorHttpsService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
