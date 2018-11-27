import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { SchoolRegistrarEventCalendarComponent } from './school-registrar-event-calendar.component';

describe('SchoolRegistrarEventCalendarComponent', () => {
  let component: SchoolRegistrarEventCalendarComponent;
  let fixture: ComponentFixture<SchoolRegistrarEventCalendarComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ SchoolRegistrarEventCalendarComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(SchoolRegistrarEventCalendarComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should be created', () => {
    expect(component).toBeTruthy();
  });
});
