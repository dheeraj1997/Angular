import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { SchoolAdminSettingsExaminationComponent } from './school-admin-settings-examination.component';

describe('SchoolAdminSettingsExaminationComponent', () => {
  let component: SchoolAdminSettingsExaminationComponent;
  let fixture: ComponentFixture<SchoolAdminSettingsExaminationComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ SchoolAdminSettingsExaminationComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(SchoolAdminSettingsExaminationComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should be created', () => {
    expect(component).toBeTruthy();
  });
});
