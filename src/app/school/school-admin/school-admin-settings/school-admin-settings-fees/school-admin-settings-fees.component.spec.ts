import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { SchoolAdminSettingsFeesComponent } from './school-admin-settings-fees.component';

describe('SchoolAdminSettingsFeesComponent', () => {
  let component: SchoolAdminSettingsFeesComponent;
  let fixture: ComponentFixture<SchoolAdminSettingsFeesComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ SchoolAdminSettingsFeesComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(SchoolAdminSettingsFeesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should be created', () => {
    expect(component).toBeTruthy();
  });
});
