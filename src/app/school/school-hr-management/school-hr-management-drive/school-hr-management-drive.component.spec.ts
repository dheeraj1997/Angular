import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { SchoolHrManagementDriveComponent } from './school-hr-management-drive.component';

describe('SchoolHrManagementDriveComponent', () => {
  let component: SchoolHrManagementDriveComponent;
  let fixture: ComponentFixture<SchoolHrManagementDriveComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ SchoolHrManagementDriveComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(SchoolHrManagementDriveComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should be created', () => {
    expect(component).toBeTruthy();
  });
});
