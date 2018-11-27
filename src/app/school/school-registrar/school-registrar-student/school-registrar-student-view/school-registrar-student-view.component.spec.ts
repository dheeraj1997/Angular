import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { SchoolRegistrarStudentViewComponent } from './school-registrar-student-view.component';

describe('SchoolRegistrarStudentViewComponent', () => {
  let component: SchoolRegistrarStudentViewComponent;
  let fixture: ComponentFixture<SchoolRegistrarStudentViewComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ SchoolRegistrarStudentViewComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(SchoolRegistrarStudentViewComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should be created', () => {
    expect(component).toBeTruthy();
  });
});
