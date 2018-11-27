import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { SchoolLibrarianManageIssueComponent } from './school-librarian-manage-issue.component';

describe('SchoolLibrarianManageIssueComponent', () => {
  let component: SchoolLibrarianManageIssueComponent;
  let fixture: ComponentFixture<SchoolLibrarianManageIssueComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ SchoolLibrarianManageIssueComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(SchoolLibrarianManageIssueComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should be created', () => {
    expect(component).toBeTruthy();
  });
});
