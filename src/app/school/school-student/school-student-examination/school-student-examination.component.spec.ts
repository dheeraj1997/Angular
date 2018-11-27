import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { SchoolStudentExaminationComponent } from './school-student-examination.component';

describe('SchoolStudentExaminationComponent', () => {
  let component: SchoolStudentExaminationComponent;
  let fixture: ComponentFixture<SchoolStudentExaminationComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ SchoolStudentExaminationComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(SchoolStudentExaminationComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should be created', () => {
    expect(component).toBeTruthy();
  });
});
