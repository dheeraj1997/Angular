import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { SchoolHrManagementEventCalendarComponent } from './school-hr-management-event-calendar.component';

describe('SchoolHrManagementEventCalendarComponent', () => {
  let component: SchoolHrManagementEventCalendarComponent;
  let fixture: ComponentFixture<SchoolHrManagementEventCalendarComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ SchoolHrManagementEventCalendarComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(SchoolHrManagementEventCalendarComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should be created', () => {
    expect(component).toBeTruthy();
  });
});
