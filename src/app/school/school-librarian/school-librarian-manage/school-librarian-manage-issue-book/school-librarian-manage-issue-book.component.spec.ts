import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { SchoolLibrarianManageIssueBookComponent } from './school-librarian-manage-issue-book.component';

describe('SchoolLibrarianManageIssueBookComponent', () => {
  let component: SchoolLibrarianManageIssueBookComponent;
  let fixture: ComponentFixture<SchoolLibrarianManageIssueBookComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ SchoolLibrarianManageIssueBookComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(SchoolLibrarianManageIssueBookComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should be created', () => {
    expect(component).toBeTruthy();
  });
});
