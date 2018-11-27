import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { SchoolStudentFeesComponent } from './school-student-fees.component';

describe('SchoolStudentFeesComponent', () => {
  let component: SchoolStudentFeesComponent;
  let fixture: ComponentFixture<SchoolStudentFeesComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ SchoolStudentFeesComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(SchoolStudentFeesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should be created', () => {
    expect(component).toBeTruthy();
  });
});
