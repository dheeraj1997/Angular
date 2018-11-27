import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { SchoolAdminAttendanceComponent } from './school-admin-attendance.component';

describe('SchoolAdminAttendanceComponent', () => {
  let component: SchoolAdminAttendanceComponent;
  let fixture: ComponentFixture<SchoolAdminAttendanceComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ SchoolAdminAttendanceComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(SchoolAdminAttendanceComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should be created', () => {
    expect(component).toBeTruthy();
  });
});
