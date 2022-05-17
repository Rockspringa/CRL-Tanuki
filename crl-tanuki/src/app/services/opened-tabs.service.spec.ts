import { TestBed } from '@angular/core/testing';

import { OpenedTabsService } from './opened-tabs.service';

describe('OpenedTabsService', () => {
  let service: OpenedTabsService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(OpenedTabsService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
