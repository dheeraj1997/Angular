import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { AdminSuperOrganizationComponent } from './admin-super-organization.component';

describe('AdminSuperOrganizationComponent', () => {
  let component: AdminSuperOrganizationComponent;
  let fixture: ComponentFixture<AdminSuperOrganizationComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ AdminSuperOrganizationComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AdminSuperOrganizationComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should be created', () => {
    expect(component).toBeTruthy();
  });
});
