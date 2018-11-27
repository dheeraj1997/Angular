import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { AdminSuperOrganizationAddComponent } from './admin-super-organization-add.component';

describe('AdminSuperOrganizationAddComponent', () => {
  let component: AdminSuperOrganizationAddComponent;
  let fixture: ComponentFixture<AdminSuperOrganizationAddComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ AdminSuperOrganizationAddComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AdminSuperOrganizationAddComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should be created', () => {
    expect(component).toBeTruthy();
  });
});
