import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { SchoolAdminAttendanceTakeComponent } from './school-admin-attendance-take.component';

describe('SchoolAdminAttendanceTakeComponent', () => {
  let component: SchoolAdminAttendanceTakeComponent;
  let fixture: ComponentFixture<SchoolAdminAttendanceTakeComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ SchoolAdminAttendanceTakeComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(SchoolAdminAttendanceTakeComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should be created', () => {
    expect(component).toBeTruthy();
  });
});
