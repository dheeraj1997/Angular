import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { SchoolLibrarianBooksViewComponent } from './school-librarian-books-view.component';

describe('SchoolLibrarianBooksViewComponent', () => {
  let component: SchoolLibrarianBooksViewComponent;
  let fixture: ComponentFixture<SchoolLibrarianBooksViewComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ SchoolLibrarianBooksViewComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(SchoolLibrarianBooksViewComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should be created', () => {
    expect(component).toBeTruthy();
  });
});
