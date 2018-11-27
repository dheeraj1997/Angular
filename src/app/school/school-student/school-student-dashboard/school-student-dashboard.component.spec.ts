import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { SchoolStudentDashboardComponent } from './school-student-dashboard.component';

describe('SchoolStudentDashboardComponent', () => {
  let component: SchoolStudentDashboardComponent;
  let fixture: ComponentFixture<SchoolStudentDashboardComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ SchoolStudentDashboardComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(SchoolStudentDashboardComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should be created', () => {
    expect(component).toBeTruthy();
  });
});
