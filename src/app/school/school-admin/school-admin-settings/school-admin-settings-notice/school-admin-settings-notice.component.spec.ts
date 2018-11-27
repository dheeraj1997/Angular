import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { SchoolAdminSettingsNoticeComponent } from './school-admin-settings-notice.component';

describe('SchoolAdminSettingsNoticeComponent', () => {
  let component: SchoolAdminSettingsNoticeComponent;
  let fixture: ComponentFixture<SchoolAdminSettingsNoticeComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ SchoolAdminSettingsNoticeComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(SchoolAdminSettingsNoticeComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should be created', () => {
    expect(component).toBeTruthy();
  });
});
