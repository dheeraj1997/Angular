import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { SchoolGuardianEventCalendarComponent } from './school-guardian-event-calendar.component';

describe('SchoolGuardianEventCalendarComponent', () => {
  let component: SchoolGuardianEventCalendarComponent;
  let fixture: ComponentFixture<SchoolGuardianEventCalendarComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ SchoolGuardianEventCalendarComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(SchoolGuardianEventCalendarComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should be created', () => {
    expect(component).toBeTruthy();
  });
});
