import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { AdminEmployeeDashboardComponent } from './admin-employee-dashboard.component';

describe('AdminEmployeeDashboardComponent', () => {
  let component: AdminEmployeeDashboardComponent;
  let fixture: ComponentFixture<AdminEmployeeDashboardComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ AdminEmployeeDashboardComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AdminEmployeeDashboardComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should be created', () => {
    expect(component).toBeTruthy();
  });
});
