import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { SchoolGuardianTimetableComponent } from './school-guardian-timetable.component';

describe('SchoolGuardianTimetableComponent', () => {
  let component: SchoolGuardianTimetableComponent;
  let fixture: ComponentFixture<SchoolGuardianTimetableComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ SchoolGuardianTimetableComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(SchoolGuardianTimetableComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should be created', () => {
    expect(component).toBeTruthy();
  });
});
