import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { SchoolStudentHomeworkComponent } from './school-student-homework.component';

describe('SchoolStudentHomeworkComponent', () => {
  let component: SchoolStudentHomeworkComponent;
  let fixture: ComponentFixture<SchoolStudentHomeworkComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ SchoolStudentHomeworkComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(SchoolStudentHomeworkComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should be created', () => {
    expect(component).toBeTruthy();
  });
});
