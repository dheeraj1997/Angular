import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { SchoolAdminSettingsComponent } from './school-admin-settings.component';

describe('SchoolAdminSettingsComponent', () => {
  let component: SchoolAdminSettingsComponent;
  let fixture: ComponentFixture<SchoolAdminSettingsComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ SchoolAdminSettingsComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(SchoolAdminSettingsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should be created', () => {
    expect(component).toBeTruthy();
  });
});
