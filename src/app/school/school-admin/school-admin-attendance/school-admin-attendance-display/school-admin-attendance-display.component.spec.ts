import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { SchoolAdminAttendanceDisplayComponent } from './school-admin-attendance-display.component';

describe('SchoolAdminAttendanceDisplayComponent', () => {
  let component: SchoolAdminAttendanceDisplayComponent;
  let fixture: ComponentFixture<SchoolAdminAttendanceDisplayComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ SchoolAdminAttendanceDisplayComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(SchoolAdminAttendanceDisplayComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should be created', () => {
    expect(component).toBeTruthy();
  });
});
