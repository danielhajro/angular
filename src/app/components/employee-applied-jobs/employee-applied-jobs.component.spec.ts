import { ComponentFixture, TestBed } from '@angular/core/testing';

import { EmployeeAppliedJobsComponent } from './employee-applied-jobs.component';

describe('EmployeeAppliedJobsComponent', () => {
  let component: EmployeeAppliedJobsComponent;
  let fixture: ComponentFixture<EmployeeAppliedJobsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ EmployeeAppliedJobsComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(EmployeeAppliedJobsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
