import { TestBed } from '@angular/core/testing';

import { ProizvodServisService } from './proizvod-servis.service';

describe('ProizvodServisService', () => {
  let service: ProizvodServisService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(ProizvodServisService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
