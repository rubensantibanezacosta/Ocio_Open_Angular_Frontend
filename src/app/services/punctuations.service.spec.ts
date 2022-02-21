import { TestBed } from '@angular/core/testing';

import { PunctuationsService } from './punctuations.service';

describe('PunctuationsService', () => {
  let service: PunctuationsService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(PunctuationsService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
