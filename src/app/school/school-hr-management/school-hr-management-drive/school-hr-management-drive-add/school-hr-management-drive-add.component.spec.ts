import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { SchoolHrManagementDriveAddComponent } from './school-hr-management-drive-add.component';

describe('SchoolHrManagementDriveAddComponent', () => {
  let component: SchoolHrManagementDriveAddComponent;
  let fixture: ComponentFixture<SchoolHrManagementDriveAddComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ SchoolHrManagementDriveAddComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(SchoolHrManagementDriveAddComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should be created', () => {
    expect(component).toBeTruthy();
  });
});
