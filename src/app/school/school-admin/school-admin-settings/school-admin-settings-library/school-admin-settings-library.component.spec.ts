import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { SchoolAdminSettingsLibraryComponent } from './school-admin-settings-library.component';

describe('SchoolAdminSettingsLibraryComponent', () => {
  let component: SchoolAdminSettingsLibraryComponent;
  let fixture: ComponentFixture<SchoolAdminSettingsLibraryComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ SchoolAdminSettingsLibraryComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(SchoolAdminSettingsLibraryComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should be created', () => {
    expect(component).toBeTruthy();
  });
});
