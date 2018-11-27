import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { SchoolHrManagementAttendanceAddComponent } from './school-hr-management-attendance-add.component';

describe('SchoolHrManagementAttendanceAddComponent', () => {
  let component: SchoolHrManagementAttendanceAddComponent;
  let fixture: ComponentFixture<SchoolHrManagementAttendanceAddComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ SchoolHrManagementAttendanceAddComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(SchoolHrManagementAttendanceAddComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should be created', () => {
    expect(component).toBeTruthy();
  });
});
