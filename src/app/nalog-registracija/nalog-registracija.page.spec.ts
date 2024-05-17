import { ComponentFixture, TestBed } from '@angular/core/testing';
import { NalogRegistracijaPage } from './nalog-registracija.page';

describe('NalogRegistracijaPage', () => {
  let component: NalogRegistracijaPage;
  let fixture: ComponentFixture<NalogRegistracijaPage>;

  beforeEach(() => {
    fixture = TestBed.createComponent(NalogRegistracijaPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
