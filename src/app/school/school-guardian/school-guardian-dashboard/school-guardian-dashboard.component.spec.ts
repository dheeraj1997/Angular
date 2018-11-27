import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { SchoolGuardianDashboardComponent } from './school-guardian-dashboard.component';

describe('SchoolGuardianDashboardComponent', () => {
  let component: SchoolGuardianDashboardComponent;
  let fixture: ComponentFixture<SchoolGuardianDashboardComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ SchoolGuardianDashboardComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(SchoolGuardianDashboardComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should be created', () => {
    expect(component).toBeTruthy();
  });
});
