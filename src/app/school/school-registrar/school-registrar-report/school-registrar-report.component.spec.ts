import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { SchoolRegistrarReportComponent } from './school-registrar-report.component';

describe('SchoolRegistrarReportComponent', () => {
  let component: SchoolRegistrarReportComponent;
  let fixture: ComponentFixture<SchoolRegistrarReportComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ SchoolRegistrarReportComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(SchoolRegistrarReportComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should be created', () => {
    expect(component).toBeTruthy();
  });
});
