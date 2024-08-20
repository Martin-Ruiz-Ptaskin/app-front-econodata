import { TestBed } from '@angular/core/testing';

import { PoliticianListService } from './politician-list.service';

describe('PoliticianListService', () => {
  let service: PoliticianListService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(PoliticianListService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
