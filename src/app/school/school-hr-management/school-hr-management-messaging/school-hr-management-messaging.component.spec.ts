import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { SchoolHrManagementMessagingComponent } from './school-hr-management-messaging.component';

describe('SchoolHrManagementMessagingComponent', () => {
  let component: SchoolHrManagementMessagingComponent;
  let fixture: ComponentFixture<SchoolHrManagementMessagingComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ SchoolHrManagementMessagingComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(SchoolHrManagementMessagingComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should be created', () => {
    expect(component).toBeTruthy();
  });
});
