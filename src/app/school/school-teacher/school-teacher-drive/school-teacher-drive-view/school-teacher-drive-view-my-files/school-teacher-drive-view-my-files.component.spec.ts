import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { SchoolTeacherDriveViewMyFilesComponent } from './school-teacher-drive-view-my-files.component';

describe('SchoolTeacherDriveViewMyFilesComponent', () => {
  let component: SchoolTeacherDriveViewMyFilesComponent;
  let fixture: ComponentFixture<SchoolTeacherDriveViewMyFilesComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ SchoolTeacherDriveViewMyFilesComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(SchoolTeacherDriveViewMyFilesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should be created', () => {
    expect(component).toBeTruthy();
  });
});
