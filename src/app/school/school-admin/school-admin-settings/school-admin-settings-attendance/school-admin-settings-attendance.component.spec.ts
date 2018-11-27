import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { SchoolAdminSettingsAttendanceComponent } from './school-admin-settings-attendance.component';

describe('SchoolAdminSettingsAttendanceComponent', () => {
  let component: SchoolAdminSettingsAttendanceComponent;
  let fixture: ComponentFixture<SchoolAdminSettingsAttendanceComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ SchoolAdminSettingsAttendanceComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(SchoolAdminSettingsAttendanceComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should be created', () => {
    expect(component).toBeTruthy();
  });
});
