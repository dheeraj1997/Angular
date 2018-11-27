import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { SchoolAdminSettingsGlobalComponent } from './school-admin-settings-global.component';

describe('SchoolAdminSettingsGlobalComponent', () => {
  let component: SchoolAdminSettingsGlobalComponent;
  let fixture: ComponentFixture<SchoolAdminSettingsGlobalComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ SchoolAdminSettingsGlobalComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(SchoolAdminSettingsGlobalComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should be created', () => {
    expect(component).toBeTruthy();
  });
});
