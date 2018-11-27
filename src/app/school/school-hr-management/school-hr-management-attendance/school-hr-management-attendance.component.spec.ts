import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { SchoolHrManagementAttendanceComponent } from './school-hr-management-attendance.component';

describe('SchoolHrManagementAttendanceComponent', () => {
  let component: SchoolHrManagementAttendanceComponent;
  let fixture: ComponentFixture<SchoolHrManagementAttendanceComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ SchoolHrManagementAttendanceComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(SchoolHrManagementAttendanceComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should be created', () => {
    expect(component).toBeTruthy();
  });
});
