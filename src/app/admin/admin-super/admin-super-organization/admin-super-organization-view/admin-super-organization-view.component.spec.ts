import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { AdminSuperOrganizationViewComponent } from './admin-super-organization-view.component';

describe('AdminSuperOrganizationViewComponent', () => {
  let component: AdminSuperOrganizationViewComponent;
  let fixture: ComponentFixture<AdminSuperOrganizationViewComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ AdminSuperOrganizationViewComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AdminSuperOrganizationViewComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should be created', () => {
    expect(component).toBeTruthy();
  });
});
