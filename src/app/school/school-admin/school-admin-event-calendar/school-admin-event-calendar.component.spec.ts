import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { SchoolAdminEventCalendarComponent } from './school-admin-event-calendar.component';

describe('SchoolAdminEventCalendarComponent', () => {
  let component: SchoolAdminEventCalendarComponent;
  let fixture: ComponentFixture<SchoolAdminEventCalendarComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ SchoolAdminEventCalendarComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(SchoolAdminEventCalendarComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should be created', () => {
    expect(component).toBeTruthy();
  });
});
