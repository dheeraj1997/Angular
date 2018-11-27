import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { SchoolAdminNoticeComponent } from './school-admin-notice.component';

describe('SchoolAdminNoticeComponent', () => {
  let component: SchoolAdminNoticeComponent;
  let fixture: ComponentFixture<SchoolAdminNoticeComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ SchoolAdminNoticeComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(SchoolAdminNoticeComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should be created', () => {
    expect(component).toBeTruthy();
  });
});
