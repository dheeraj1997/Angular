import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { SchoolAdminNoticeAddComponent } from './school-admin-notice-add.component';

describe('SchoolAdminNoticeAddComponent', () => {
  let component: SchoolAdminNoticeAddComponent;
  let fixture: ComponentFixture<SchoolAdminNoticeAddComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ SchoolAdminNoticeAddComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(SchoolAdminNoticeAddComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should be created', () => {
    expect(component).toBeTruthy();
  });
});
