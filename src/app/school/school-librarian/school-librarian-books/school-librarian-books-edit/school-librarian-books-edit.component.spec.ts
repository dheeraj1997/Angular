import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { SchoolLibrarianBooksEditComponent } from './school-librarian-books-edit.component';

describe('SchoolLibrarianBooksEditComponent', () => {
  let component: SchoolLibrarianBooksEditComponent;
  let fixture: ComponentFixture<SchoolLibrarianBooksEditComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ SchoolLibrarianBooksEditComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(SchoolLibrarianBooksEditComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should be created', () => {
    expect(component).toBeTruthy();
  });
});
