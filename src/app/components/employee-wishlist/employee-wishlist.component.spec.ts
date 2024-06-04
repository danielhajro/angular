import { ComponentFixture, TestBed } from '@angular/core/testing';

import { EmployeeWishlistComponent } from './employee-wishlist.component';

describe('EmployeeWishlistComponent', () => {
  let component: EmployeeWishlistComponent;
  let fixture: ComponentFixture<EmployeeWishlistComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ EmployeeWishlistComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(EmployeeWishlistComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
