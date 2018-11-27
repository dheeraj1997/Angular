import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { SchoolAdminTimetableCreateComponent } from './school-admin-timetable-create.component';

describe('SchoolAdminTimetableCreateComponent', () => {
  let component: SchoolAdminTimetableCreateComponent;
  let fixture: ComponentFixture<SchoolAdminTimetableCreateComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ SchoolAdminTimetableCreateComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(SchoolAdminTimetableCreateComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should be created', () => {
    expect(component).toBeTruthy();
  });
});
