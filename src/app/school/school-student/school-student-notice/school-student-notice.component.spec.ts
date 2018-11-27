import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { SchoolStudentNoticeComponent } from './school-student-notice.component';

describe('SchoolStudentNoticeComponent', () => {
  let component: SchoolStudentNoticeComponent;
  let fixture: ComponentFixture<SchoolStudentNoticeComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ SchoolStudentNoticeComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(SchoolStudentNoticeComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should be created', () => {
    expect(component).toBeTruthy();
  });
});
