import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { SchoolAdminSettingsMessagingComponent } from './school-admin-settings-messaging.component';

describe('SchoolAdminSettingsMessagingComponent', () => {
  let component: SchoolAdminSettingsMessagingComponent;
  let fixture: ComponentFixture<SchoolAdminSettingsMessagingComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ SchoolAdminSettingsMessagingComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(SchoolAdminSettingsMessagingComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should be created', () => {
    expect(component).toBeTruthy();
  });
});
