import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { AdminOrganizationSchoolComponent } from './admin-organization-school.component';

describe('AdminOrganizationSchoolComponent', () => {
  let component: AdminOrganizationSchoolComponent;
  let fixture: ComponentFixture<AdminOrganizationSchoolComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ AdminOrganizationSchoolComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AdminOrganizationSchoolComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should be created', () => {
    expect(component).toBeTruthy();
  });
});
