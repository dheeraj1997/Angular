import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { SchoolHrManagementAttendanceTakeComponent } from './school-hr-management-attendance-take.component';

describe('SchoolHrManagementAttendanceTakeComponent', () => {
  let component: SchoolHrManagementAttendanceTakeComponent;
  let fixture: ComponentFixture<SchoolHrManagementAttendanceTakeComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ SchoolHrManagementAttendanceTakeComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(SchoolHrManagementAttendanceTakeComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should be created', () => {
    expect(component).toBeTruthy();
  });
});
