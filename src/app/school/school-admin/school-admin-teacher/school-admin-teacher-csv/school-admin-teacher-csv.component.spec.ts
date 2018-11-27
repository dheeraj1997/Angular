import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { SchoolAdminTeacherCsvComponent } from './school-admin-teacher-csv.component';

describe('SchoolAdminTeacherCsvComponent', () => {
  let component: SchoolAdminTeacherCsvComponent;
  let fixture: ComponentFixture<SchoolAdminTeacherCsvComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ SchoolAdminTeacherCsvComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(SchoolAdminTeacherCsvComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should be created', () => {
    expect(component).toBeTruthy();
  });
});
