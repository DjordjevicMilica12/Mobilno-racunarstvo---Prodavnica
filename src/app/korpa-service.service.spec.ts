import { TestBed } from '@angular/core/testing';

import { KorpaServiceService } from './korpa-service.service';

describe('KorpaServiceService', () => {
  let service: KorpaServiceService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(KorpaServiceService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
