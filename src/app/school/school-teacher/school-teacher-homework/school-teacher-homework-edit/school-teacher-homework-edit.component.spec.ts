import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { SchoolTeacherHomeworkEditComponent } from './school-teacher-homework-edit.component';

describe('SchoolTeacherHomeworkEditComponent', () => {
  let component: SchoolTeacherHomeworkEditComponent;
  let fixture: ComponentFixture<SchoolTeacherHomeworkEditComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ SchoolTeacherHomeworkEditComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(SchoolTeacherHomeworkEditComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should be created', () => {
    expect(component).toBeTruthy();
  });
});
