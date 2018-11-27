import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { SchoolLibrarianBooksAddComponent } from './school-librarian-books-add.component';

describe('SchoolLibrarianBooksAddComponent', () => {
  let component: SchoolLibrarianBooksAddComponent;
  let fixture: ComponentFixture<SchoolLibrarianBooksAddComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ SchoolLibrarianBooksAddComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(SchoolLibrarianBooksAddComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should be created', () => {
    expect(component).toBeTruthy();
  });
});
