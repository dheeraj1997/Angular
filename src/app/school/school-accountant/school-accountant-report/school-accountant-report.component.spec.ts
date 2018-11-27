import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { SchoolAccountantReportComponent } from './school-accountant-report.component';

describe('SchoolAccountantReportComponent', () => {
  let component: SchoolAccountantReportComponent;
  let fixture: ComponentFixture<SchoolAccountantReportComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ SchoolAccountantReportComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(SchoolAccountantReportComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should be created', () => {
    expect(component).toBeTruthy();
  });
});
