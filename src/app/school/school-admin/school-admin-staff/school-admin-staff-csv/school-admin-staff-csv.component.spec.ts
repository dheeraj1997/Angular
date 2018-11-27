import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { SchoolAdminStaffCsvComponent } from './school-admin-staff-csv.component';

describe('SchoolAdminStaffCsvComponent', () => {
  let component: SchoolAdminStaffCsvComponent;
  let fixture: ComponentFixture<SchoolAdminStaffCsvComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ SchoolAdminStaffCsvComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(SchoolAdminStaffCsvComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should be created', () => {
    expect(component).toBeTruthy();
  });
});
