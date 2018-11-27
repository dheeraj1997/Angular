import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { SchoolHrManagementComponent } from './school-hr-management.component';

describe('SchoolHRManagementComponent', () => {
  let component: SchoolHrManagementComponent;
  let fixture: ComponentFixture<SchoolHrManagementComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ SchoolHrManagementComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(SchoolHrManagementComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should be created', () => {
    expect(component).toBeTruthy();
  });
});
