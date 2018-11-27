import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { SchoolAdminAttendanceListComponent } from './school-admin-attendance-list.component';

describe('SchoolAdminAttendanceListComponent', () => {
  let component: SchoolAdminAttendanceListComponent;
  let fixture: ComponentFixture<SchoolAdminAttendanceListComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ SchoolAdminAttendanceListComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(SchoolAdminAttendanceListComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should be created', () => {
    expect(component).toBeTruthy();
  });
});
