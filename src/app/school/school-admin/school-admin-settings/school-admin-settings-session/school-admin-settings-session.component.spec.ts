import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { SchoolAdminSettingsSessionComponent } from './school-admin-settings-session.component';

describe('SchoolAdminSettingsSessionComponent', () => {
  let component: SchoolAdminSettingsSessionComponent;
  let fixture: ComponentFixture<SchoolAdminSettingsSessionComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ SchoolAdminSettingsSessionComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(SchoolAdminSettingsSessionComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should be created', () => {
    expect(component).toBeTruthy();
  });
});
