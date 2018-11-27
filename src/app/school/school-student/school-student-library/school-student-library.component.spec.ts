import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { SchoolStudentLibraryComponent } from './school-student-library.component';

describe('SchoolStudentLibraryComponent', () => {
  let component: SchoolStudentLibraryComponent;
  let fixture: ComponentFixture<SchoolStudentLibraryComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ SchoolStudentLibraryComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(SchoolStudentLibraryComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should be created', () => {
    expect(component).toBeTruthy();
  });
});
