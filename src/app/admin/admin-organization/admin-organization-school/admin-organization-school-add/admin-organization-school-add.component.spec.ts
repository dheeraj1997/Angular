import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { AdminOrganizationSchoolAddComponent } from './admin-organization-school-add.component';

describe('AdminOrganizationSchoolAddComponent', () => {
  let component: AdminOrganizationSchoolAddComponent;
  let fixture: ComponentFixture<AdminOrganizationSchoolAddComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ AdminOrganizationSchoolAddComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AdminOrganizationSchoolAddComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should be created', () => {
    expect(component).toBeTruthy();
  });
});
