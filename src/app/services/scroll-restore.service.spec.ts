import { TestBed } from '@angular/core/testing';

import { ScrollRestoreService } from './scroll-restore.service';

describe('ScrollRestoreService', () => {
  let service: ScrollRestoreService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(ScrollRestoreService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
