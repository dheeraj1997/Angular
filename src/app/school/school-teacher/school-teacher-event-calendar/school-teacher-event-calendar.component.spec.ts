import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { SchoolTeacherEventCalendarComponent } from './school-teacher-event-calendar.component';

describe('SchoolTeacherEventCalendarComponent', () => {
  let component: SchoolTeacherEventCalendarComponent;
  let fixture: ComponentFixture<SchoolTeacherEventCalendarComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ SchoolTeacherEventCalendarComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(SchoolTeacherEventCalendarComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should be created', () => {
    expect(component).toBeTruthy();
  });
});
