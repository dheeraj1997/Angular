import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { SchoolLibrarianNoticeComponent } from './school-librarian-notice.component';

describe('SchoolLibrarianNoticeComponent', () => {
  let component: SchoolLibrarianNoticeComponent;
  let fixture: ComponentFixture<SchoolLibrarianNoticeComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ SchoolLibrarianNoticeComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(SchoolLibrarianNoticeComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should be created', () => {
    expect(component).toBeTruthy();
  });
});
