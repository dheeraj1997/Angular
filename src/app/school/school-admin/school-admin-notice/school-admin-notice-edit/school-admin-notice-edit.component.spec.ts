import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { SchoolAdminNoticeEditComponent } from './school-admin-notice-edit.component';

describe('SchoolAdminNoticeEditComponent', () => {
  let component: SchoolAdminNoticeEditComponent;
  let fixture: ComponentFixture<SchoolAdminNoticeEditComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ SchoolAdminNoticeEditComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(SchoolAdminNoticeEditComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should be created', () => {
    expect(component).toBeTruthy();
  });
});
