import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { AdminOrganizationSchoolViewComponent } from './admin-organization-school-view.component';

describe('AdminOrganizationSchoolViewComponent', () => {
  let component: AdminOrganizationSchoolViewComponent;
  let fixture: ComponentFixture<AdminOrganizationSchoolViewComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ AdminOrganizationSchoolViewComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AdminOrganizationSchoolViewComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should be created', () => {
    expect(component).toBeTruthy();
  });
});
