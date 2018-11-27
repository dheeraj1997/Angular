import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { SchoolAdminTimetableViewComponent } from './school-admin-timetable-view.component';

describe('SchoolAdminTimetableViewComponent', () => {
  let component: SchoolAdminTimetableViewComponent;
  let fixture: ComponentFixture<SchoolAdminTimetableViewComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ SchoolAdminTimetableViewComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(SchoolAdminTimetableViewComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should be created', () => {
    expect(component).toBeTruthy();
  });
});
