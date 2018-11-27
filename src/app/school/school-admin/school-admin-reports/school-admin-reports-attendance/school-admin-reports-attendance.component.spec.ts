import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { SchoolAdminReportsAttendanceComponent } from './school-admin-reports-attendance.component';

describe('SchoolAdminReportsAttendanceComponent', () => {
  let component: SchoolAdminReportsAttendanceComponent;
  let fixture: ComponentFixture<SchoolAdminReportsAttendanceComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ SchoolAdminReportsAttendanceComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(SchoolAdminReportsAttendanceComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should be created', () => {
    expect(component).toBeTruthy();
  });
});
