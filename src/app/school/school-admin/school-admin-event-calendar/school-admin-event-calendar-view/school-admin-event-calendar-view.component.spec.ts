import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { SchoolAdminEventCalendarViewComponent } from './school-admin-event-calendar-view.component';

describe('SchoolAdminEventCalendarViewComponent', () => {
  let component: SchoolAdminEventCalendarViewComponent;
  let fixture: ComponentFixture<SchoolAdminEventCalendarViewComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ SchoolAdminEventCalendarViewComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(SchoolAdminEventCalendarViewComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should be created', () => {
    expect(component).toBeTruthy();
  });
});
