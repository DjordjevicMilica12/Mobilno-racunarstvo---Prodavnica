import { ComponentFixture, TestBed } from '@angular/core/testing';
import { KorpaPage } from './korpa.page';

describe('KorpaPage', () => {
  let component: KorpaPage;
  let fixture: ComponentFixture<KorpaPage>;

  beforeEach(() => {
    fixture = TestBed.createComponent(KorpaPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
