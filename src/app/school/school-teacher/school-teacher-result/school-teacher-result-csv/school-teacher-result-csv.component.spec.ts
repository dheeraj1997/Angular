import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { SchoolTeacherResultCsvComponent } from './school-teacher-result-csv.component';

describe('SchoolTeacherResultCsvComponent', () => {
  let component: SchoolTeacherResultCsvComponent;
  let fixture: ComponentFixture<SchoolTeacherResultCsvComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ SchoolTeacherResultCsvComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(SchoolTeacherResultCsvComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should be created', () => {
    expect(component).toBeTruthy();
  });
});
