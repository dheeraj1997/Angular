import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { AdminOrganizationSchoolEditComponent } from './admin-organization-school-edit.component';

describe('AdminOrganizationSchoolEditComponent', () => {
  let component: AdminOrganizationSchoolEditComponent;
  let fixture: ComponentFixture<AdminOrganizationSchoolEditComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ AdminOrganizationSchoolEditComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AdminOrganizationSchoolEditComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should be created', () => {
    expect(component).toBeTruthy();
  });
});
