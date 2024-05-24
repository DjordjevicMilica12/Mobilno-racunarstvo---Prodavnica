import { ComponentFixture, TestBed } from '@angular/core/testing';
import { IstorijaPorudzbinaPage } from './istorija-porudzbina.page';

describe('IstorijaPorudzbinaPage', () => {
  let component: IstorijaPorudzbinaPage;
  let fixture: ComponentFixture<IstorijaPorudzbinaPage>;

  beforeEach(() => {
    fixture = TestBed.createComponent(IstorijaPorudzbinaPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
