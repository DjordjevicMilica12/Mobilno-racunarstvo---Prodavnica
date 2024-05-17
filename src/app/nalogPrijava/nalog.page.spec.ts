import { ComponentFixture, TestBed } from '@angular/core/testing';
import { NalogPage } from './nalog.page';

describe('NalogPage', () => {
  let component: NalogPage;
  let fixture: ComponentFixture<NalogPage>;

  beforeEach(() => {
    fixture = TestBed.createComponent(NalogPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
