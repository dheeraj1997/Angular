import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { SchoolRegistrarStudentAddComponent } from './school-registrar-student-add.component';

describe('SchoolRegistrarStudentAddComponent', () => {
  let component: SchoolRegistrarStudentAddComponent;
  let fixture: ComponentFixture<SchoolRegistrarStudentAddComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ SchoolRegistrarStudentAddComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(SchoolRegistrarStudentAddComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should be created', () => {
    expect(component).toBeTruthy();
  });
});
