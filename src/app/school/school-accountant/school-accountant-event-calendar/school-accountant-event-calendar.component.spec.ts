import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { SchoolAccountantEventCalendarComponent } from './school-accountant-event-calendar.component';

describe('SchoolAccountantEventCalendarComponent', () => {
  let component: SchoolAccountantEventCalendarComponent;
  let fixture: ComponentFixture<SchoolAccountantEventCalendarComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ SchoolAccountantEventCalendarComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(SchoolAccountantEventCalendarComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should be created', () => {
    expect(component).toBeTruthy();
  });
});
