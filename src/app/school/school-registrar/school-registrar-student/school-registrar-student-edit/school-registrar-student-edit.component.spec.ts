import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { SchoolRegistrarStudentEditComponent } from './school-registrar-student-edit.component';

describe('SchoolRegistrarStudentEditComponent', () => {
  let component: SchoolRegistrarStudentEditComponent;
  let fixture: ComponentFixture<SchoolRegistrarStudentEditComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ SchoolRegistrarStudentEditComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(SchoolRegistrarStudentEditComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should be created', () => {
    expect(component).toBeTruthy();
  });
});
