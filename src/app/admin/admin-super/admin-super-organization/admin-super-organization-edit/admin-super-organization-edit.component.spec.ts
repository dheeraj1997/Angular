import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { AdminSuperOrganizationEditComponent } from './admin-super-organization-edit.component';

describe('AdminSuperOrganizationEditComponent', () => {
  let component: AdminSuperOrganizationEditComponent;
  let fixture: ComponentFixture<AdminSuperOrganizationEditComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ AdminSuperOrganizationEditComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AdminSuperOrganizationEditComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should be created', () => {
    expect(component).toBeTruthy();
  });
});
