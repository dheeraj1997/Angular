import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { SchoolRegistrarStudentComponent } from './school-registrar-student.component';

describe('SchoolRegistrarStudentComponent', () => {
  let component: SchoolRegistrarStudentComponent;
  let fixture: ComponentFixture<SchoolRegistrarStudentComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ SchoolRegistrarStudentComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(SchoolRegistrarStudentComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should be created', () => {
    expect(component).toBeTruthy();
  });
});
