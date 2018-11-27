import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { SchoolHrManagementNoticeComponent } from './school-hr-management-notice.component';

describe('SchoolHrManagementNoticeComponent', () => {
  let component: SchoolHrManagementNoticeComponent;
  let fixture: ComponentFixture<SchoolHrManagementNoticeComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ SchoolHrManagementNoticeComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(SchoolHrManagementNoticeComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should be created', () => {
    expect(component).toBeTruthy();
  });
});
