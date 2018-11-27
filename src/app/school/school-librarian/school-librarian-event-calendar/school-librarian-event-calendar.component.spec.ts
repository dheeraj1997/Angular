import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { SchoolLibrarianEventCalendarComponent } from './school-librarian-event-calendar.component';

describe('SchoolLibrarianEventCalendarComponent', () => {
  let component: SchoolLibrarianEventCalendarComponent;
  let fixture: ComponentFixture<SchoolLibrarianEventCalendarComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ SchoolLibrarianEventCalendarComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(SchoolLibrarianEventCalendarComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should be created', () => {
    expect(component).toBeTruthy();
  });
});
