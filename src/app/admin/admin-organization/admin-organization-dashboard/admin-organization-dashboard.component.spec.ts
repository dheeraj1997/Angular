import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { AdminOrganizationDashboardComponent } from './admin-organization-dashboard.component';

describe('AdminOrganizationDashboardComponent', () => {
  let component: AdminOrganizationDashboardComponent;
  let fixture: ComponentFixture<AdminOrganizationDashboardComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ AdminOrganizationDashboardComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AdminOrganizationDashboardComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should be created', () => {
    expect(component).toBeTruthy();
  });
});
