import { ComponentFixture, TestBed } from '@angular/core/testing';

import { RegistrationFrontComponent } from './registration-front.component';

describe('RegistrationFrontComponent', () => {
  let component: RegistrationFrontComponent;
  let fixture: ComponentFixture<RegistrationFrontComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ RegistrationFrontComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(RegistrationFrontComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
