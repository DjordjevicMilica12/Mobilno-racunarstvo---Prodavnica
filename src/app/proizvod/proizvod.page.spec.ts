import { ComponentFixture, TestBed } from '@angular/core/testing';
import { ProizvodPage } from './proizvod.page';

describe('ProizvodPage', () => {
  let component: ProizvodPage;
  let fixture: ComponentFixture<ProizvodPage>;

  beforeEach(() => {
    fixture = TestBed.createComponent(ProizvodPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
