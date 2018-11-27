import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { SchoolAdminMessageSendComponent } from './school-admin-message-send.component';

describe('SchoolAdminMessageSendComponent', () => {
  let component: SchoolAdminMessageSendComponent;
  let fixture: ComponentFixture<SchoolAdminMessageSendComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ SchoolAdminMessageSendComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(SchoolAdminMessageSendComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should be created', () => {
    expect(component).toBeTruthy();
  });
});
