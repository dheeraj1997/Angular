import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { SchoolTeacherDriveViewMainComponent } from './school-teacher-drive-view-main.component';

describe('SchoolTeacherDriveViewMainComponent', () => {
  let component: SchoolTeacherDriveViewMainComponent;
  let fixture: ComponentFixture<SchoolTeacherDriveViewMainComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ SchoolTeacherDriveViewMainComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(SchoolTeacherDriveViewMainComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should be created', () => {
    expect(component).toBeTruthy();
  });
});
