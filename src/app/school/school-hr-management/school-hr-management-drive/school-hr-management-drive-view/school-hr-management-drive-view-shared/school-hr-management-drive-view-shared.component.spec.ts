import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { SchoolHrManagementDriveViewSharedComponent } from './school-hr-management-drive-view-shared.component';

describe('SchoolHrManagementDriveViewSharedComponent', () => {
  let component: SchoolHrManagementDriveViewSharedComponent;
  let fixture: ComponentFixture<SchoolHrManagementDriveViewSharedComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ SchoolHrManagementDriveViewSharedComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(SchoolHrManagementDriveViewSharedComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should be created', () => {
    expect(component).toBeTruthy();
  });
});
