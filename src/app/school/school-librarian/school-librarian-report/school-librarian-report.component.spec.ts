import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { SchoolLibrarianReportComponent } from './school-librarian-report.component';

describe('SchoolLibrarianReportComponent', () => {
  let component: SchoolLibrarianReportComponent;
  let fixture: ComponentFixture<SchoolLibrarianReportComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ SchoolLibrarianReportComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(SchoolLibrarianReportComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should be created', () => {
    expect(component).toBeTruthy();
  });
});
