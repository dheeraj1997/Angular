import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { SchoolAdminAttendanceViewComponent } from './school-admin-attendance-view.component';

describe('SchoolAdminAttendanceViewComponent', () => {
  let component: SchoolAdminAttendanceViewComponent;
  let fixture: ComponentFixture<SchoolAdminAttendanceViewComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ SchoolAdminAttendanceViewComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(SchoolAdminAttendanceViewComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should be created', () => {
    expect(component).toBeTruthy();
  });
});
