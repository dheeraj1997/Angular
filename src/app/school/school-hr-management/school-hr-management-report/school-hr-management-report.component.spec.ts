import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { SchoolHrManagementReportComponent } from './school-hr-management-report.component';

describe('SchoolHrManagementReportComponent', () => {
  let component: SchoolHrManagementReportComponent;
  let fixture: ComponentFixture<SchoolHrManagementReportComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ SchoolHrManagementReportComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(SchoolHrManagementReportComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should be created', () => {
    expect(component).toBeTruthy();
  });
});
