import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { SchoolHrManagementDriveViewMyFilesComponent } from './school-hr-management-drive-view-my-files.component';

describe('SchoolHrManagementDriveViewMyFilesComponent', () => {
  let component: SchoolHrManagementDriveViewMyFilesComponent;
  let fixture: ComponentFixture<SchoolHrManagementDriveViewMyFilesComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ SchoolHrManagementDriveViewMyFilesComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(SchoolHrManagementDriveViewMyFilesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should be created', () => {
    expect(component).toBeTruthy();
  });
});
