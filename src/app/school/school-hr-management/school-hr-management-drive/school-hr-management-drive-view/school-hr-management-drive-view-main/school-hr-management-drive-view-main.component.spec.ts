import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { SchoolHrManagementDriveViewMainComponent } from './school-hr-management-drive-view-main.component';

describe('SchoolHrManagementDriveViewMainComponent', () => {
  let component: SchoolHrManagementDriveViewMainComponent;
  let fixture: ComponentFixture<SchoolHrManagementDriveViewMainComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ SchoolHrManagementDriveViewMainComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(SchoolHrManagementDriveViewMainComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should be created', () => {
    expect(component).toBeTruthy();
  });
});
