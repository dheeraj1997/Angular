import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { SchoolGuardianSettingsComponent } from './school-guardian-settings.component';

describe('SchoolGuardianSettingsComponent', () => {
  let component: SchoolGuardianSettingsComponent;
  let fixture: ComponentFixture<SchoolGuardianSettingsComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ SchoolGuardianSettingsComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(SchoolGuardianSettingsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should be created', () => {
    expect(component).toBeTruthy();
  });
});
