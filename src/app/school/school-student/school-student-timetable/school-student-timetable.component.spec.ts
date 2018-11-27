import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { SchoolStudentTimetableComponent } from './school-student-timetable.component';

describe('SchoolStudentTimetableComponent', () => {
  let component: SchoolStudentTimetableComponent;
  let fixture: ComponentFixture<SchoolStudentTimetableComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ SchoolStudentTimetableComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(SchoolStudentTimetableComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should be created', () => {
    expect(component).toBeTruthy();
  });
});
