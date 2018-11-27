import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { SchoolAdminSettingsSchoolComponent } from './school-admin-settings-school.component';

describe('SchoolAdminSettingsSchoolComponent', () => {
  let component: SchoolAdminSettingsSchoolComponent;
  let fixture: ComponentFixture<SchoolAdminSettingsSchoolComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ SchoolAdminSettingsSchoolComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(SchoolAdminSettingsSchoolComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should be created', () => {
    expect(component).toBeTruthy();
  });
});
