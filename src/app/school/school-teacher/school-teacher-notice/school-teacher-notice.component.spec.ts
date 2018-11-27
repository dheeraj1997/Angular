import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { SchoolTeacherNoticeComponent } from './school-teacher-notice.component';

describe('SchoolTeacherNoticeComponent', () => {
  let component: SchoolTeacherNoticeComponent;
  let fixture: ComponentFixture<SchoolTeacherNoticeComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ SchoolTeacherNoticeComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(SchoolTeacherNoticeComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should be created', () => {
    expect(component).toBeTruthy();
  });
});
