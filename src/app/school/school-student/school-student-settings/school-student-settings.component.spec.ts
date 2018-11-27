import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { SchoolStudentSettingsComponent } from './school-student-settings.component';

describe('SchoolStudentSettingsComponent', () => {
  let component: SchoolStudentSettingsComponent;
  let fixture: ComponentFixture<SchoolStudentSettingsComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ SchoolStudentSettingsComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(SchoolStudentSettingsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should be created', () => {
    expect(component).toBeTruthy();
  });
});
