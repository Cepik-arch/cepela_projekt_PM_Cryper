import { TestBed } from '@angular/core/testing';

import { CryptocompareService } from './cryptocompare.service';

describe('CryptocompareService', () => {
  let service: CryptocompareService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(CryptocompareService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
