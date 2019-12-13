import { TestBed } from '@angular/core/testing';

import { HiswsService } from './hisws.service';

describe('HiswsService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: HiswsService = TestBed.get(HiswsService);
    expect(service).toBeTruthy();
  });
});
