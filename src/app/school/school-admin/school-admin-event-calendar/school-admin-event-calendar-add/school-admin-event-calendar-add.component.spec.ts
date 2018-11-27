import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { SchoolAdminEventCalendarAddComponent } from './school-admin-event-calendar-add.component';

describe('SchoolAdminEventCalendarAddComponent', () => {
  let component: SchoolAdminEventCalendarAddComponent;
  let fixture: ComponentFixture<SchoolAdminEventCalendarAddComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ SchoolAdminEventCalendarAddComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(SchoolAdminEventCalendarAddComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should be created', () => {
    expect(component).toBeTruthy();
  });
});
