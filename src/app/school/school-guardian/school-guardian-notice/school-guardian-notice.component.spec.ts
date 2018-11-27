import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { SchoolGuardianNoticeComponent } from './school-guardian-notice.component';

describe('SchoolGuardianNoticeComponent', () => {
  let component: SchoolGuardianNoticeComponent;
  let fixture: ComponentFixture<SchoolGuardianNoticeComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ SchoolGuardianNoticeComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(SchoolGuardianNoticeComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should be created', () => {
    expect(component).toBeTruthy();
  });
});
