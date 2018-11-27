import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { SchoolStudentEventCalendarComponent } from './school-student-event-calendar.component';

describe('SchoolStudentEventCalendarComponent', () => {
  let component: SchoolStudentEventCalendarComponent;
  let fixture: ComponentFixture<SchoolStudentEventCalendarComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ SchoolStudentEventCalendarComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(SchoolStudentEventCalendarComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should be created', () => {
    expect(component).toBeTruthy();
  });
});
