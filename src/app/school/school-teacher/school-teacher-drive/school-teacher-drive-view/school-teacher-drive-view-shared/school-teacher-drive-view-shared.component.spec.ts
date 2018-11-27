import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { SchoolTeacherDriveViewSharedComponent } from './school-teacher-drive-view-shared.component';

describe('SchoolTeacherDriveViewSharedComponent', () => {
  let component: SchoolTeacherDriveViewSharedComponent;
  let fixture: ComponentFixture<SchoolTeacherDriveViewSharedComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ SchoolTeacherDriveViewSharedComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(SchoolTeacherDriveViewSharedComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should be created', () => {
    expect(component).toBeTruthy();
  });
});
