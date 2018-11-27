import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { SchoolAdminStaffEditComponent } from './school-admin-staff-edit.component';

describe('SchoolAdminStaffEditComponent', () => {
  let component: SchoolAdminStaffEditComponent;
  let fixture: ComponentFixture<SchoolAdminStaffEditComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ SchoolAdminStaffEditComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(SchoolAdminStaffEditComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should be created', () => {
    expect(component).toBeTruthy();
  });
});
