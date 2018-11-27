import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { SchoolHrManagementDashboardComponent } from './school-hr-management-dashboard.component';

describe('SchoolHrManagementDashboardComponent', () => {
  let component: SchoolHrManagementDashboardComponent;
  let fixture: ComponentFixture<SchoolHrManagementDashboardComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ SchoolHrManagementDashboardComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(SchoolHrManagementDashboardComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should be created', () => {
    expect(component).toBeTruthy();
  });
});
