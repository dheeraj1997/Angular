import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { SchoolLibrarianBooksComponent } from './school-librarian-books.component';

describe('SchoolLibrarianBooksComponent', () => {
  let component: SchoolLibrarianBooksComponent;
  let fixture: ComponentFixture<SchoolLibrarianBooksComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ SchoolLibrarianBooksComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(SchoolLibrarianBooksComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should be created', () => {
    expect(component).toBeTruthy();
  });
});
