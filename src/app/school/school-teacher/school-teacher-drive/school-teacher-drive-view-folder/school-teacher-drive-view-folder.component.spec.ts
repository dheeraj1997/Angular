import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { SchoolTeacherDriveViewFolderComponent } from './school-teacher-drive-view-folder.component';

describe('SchoolTeacherDriveViewFolderComponent', () => {
  let component: SchoolTeacherDriveViewFolderComponent;
  let fixture: ComponentFixture<SchoolTeacherDriveViewFolderComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ SchoolTeacherDriveViewFolderComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(SchoolTeacherDriveViewFolderComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should be created', () => {
    expect(component).toBeTruthy();
  });
});
