import { ComponentFixture, TestBed } from '@angular/core/testing';
import { PickupsPage } from './pickups.page';

describe('PickupsPage', () => {
  let component: PickupsPage;
  let fixture: ComponentFixture<PickupsPage>;

  beforeEach(async(() => {
    fixture = TestBed.createComponent(PickupsPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
