import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { SchoolAdminSettingsPasswordComponent } from './school-admin-settings-password.component';

describe('SchoolAdminSettingsPasswordComponent', () => {
  let component: SchoolAdminSettingsPasswordComponent;
  let fixture: ComponentFixture<SchoolAdminSettingsPasswordComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ SchoolAdminSettingsPasswordComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(SchoolAdminSettingsPasswordComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should be created', () => {
    expect(component).toBeTruthy();
  });
});
