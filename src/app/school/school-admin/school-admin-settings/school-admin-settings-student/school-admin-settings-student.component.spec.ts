import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { SchoolAdminSettingsStudentComponent } from './school-admin-settings-student.component';

describe('SchoolAdminSettingsStudentComponent', () => {
  let component: SchoolAdminSettingsStudentComponent;
  let fixture: ComponentFixture<SchoolAdminSettingsStudentComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ SchoolAdminSettingsStudentComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(SchoolAdminSettingsStudentComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should be created', () => {
    expect(component).toBeTruthy();
  });
});
