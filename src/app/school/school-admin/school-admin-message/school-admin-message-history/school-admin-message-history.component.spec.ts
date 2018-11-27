import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { SchoolAdminMessageHistoryComponent } from './school-admin-message-history.component';

describe('SchoolAdminMessageHistoryComponent', () => {
  let component: SchoolAdminMessageHistoryComponent;
  let fixture: ComponentFixture<SchoolAdminMessageHistoryComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ SchoolAdminMessageHistoryComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(SchoolAdminMessageHistoryComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should be created', () => {
    expect(component).toBeTruthy();
  });
});
