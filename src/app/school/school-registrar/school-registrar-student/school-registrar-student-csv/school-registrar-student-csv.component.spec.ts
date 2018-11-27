import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { SchoolRegistrarStudentCsvComponent } from './school-registrar-student-csv.component';

describe('SchoolRegistrarStudentCsvComponent', () => {
  let component: SchoolRegistrarStudentCsvComponent;
  let fixture: ComponentFixture<SchoolRegistrarStudentCsvComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ SchoolRegistrarStudentCsvComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(SchoolRegistrarStudentCsvComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should be created', () => {
    expect(component).toBeTruthy();
  });
});
