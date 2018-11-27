import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { SchoolHrManagementDriveViewFolderComponent } from './school-hr-management-drive-view-folder.component';

describe('SchoolHrManagementDriveViewFolderComponent', () => {
  let component: SchoolHrManagementDriveViewFolderComponent;
  let fixture: ComponentFixture<SchoolHrManagementDriveViewFolderComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ SchoolHrManagementDriveViewFolderComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(SchoolHrManagementDriveViewFolderComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should be created', () => {
    expect(component).toBeTruthy();
  });
});
