import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { SchoolAdminNoticeViewComponent } from './school-admin-notice-view.component';

describe('SchoolAdminNoticeViewComponent', () => {
  let component: SchoolAdminNoticeViewComponent;
  let fixture: ComponentFixture<SchoolAdminNoticeViewComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ SchoolAdminNoticeViewComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(SchoolAdminNoticeViewComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should be created', () => {
    expect(component).toBeTruthy();
  });
});
