import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { SchoolHrManagementAttendanceViewComponent } from './school-hr-management-attendance-view.component';

describe('SchoolHrManagementAttendanceViewComponent', () => {
  let component: SchoolHrManagementAttendanceViewComponent;
  let fixture: ComponentFixture<SchoolHrManagementAttendanceViewComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ SchoolHrManagementAttendanceViewComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(SchoolHrManagementAttendanceViewComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should be created', () => {
    expect(component).toBeTruthy();
  });
});
