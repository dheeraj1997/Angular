import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { SchoolHrManagementDriveViewComponent } from './school-hr-management-drive-view.component';

describe('SchoolHrManagementDriveViewComponent', () => {
  let component: SchoolHrManagementDriveViewComponent;
  let fixture: ComponentFixture<SchoolHrManagementDriveViewComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ SchoolHrManagementDriveViewComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(SchoolHrManagementDriveViewComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should be created', () => {
    expect(component).toBeTruthy();
  });
});
