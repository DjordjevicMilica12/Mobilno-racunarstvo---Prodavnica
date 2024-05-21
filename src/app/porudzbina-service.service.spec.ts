import { TestBed } from '@angular/core/testing';

import { PorudzbinaServiceService } from './porudzbina-service.service';

describe('PorudzbinaServiceService', () => {
  let service: PorudzbinaServiceService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(PorudzbinaServiceService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
