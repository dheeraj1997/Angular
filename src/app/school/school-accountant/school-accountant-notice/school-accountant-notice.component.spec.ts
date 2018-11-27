import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { SchoolAccountantNoticeComponent } from './school-accountant-notice.component';

describe('SchoolAccountantNoticeComponent', () => {
  let component: SchoolAccountantNoticeComponent;
  let fixture: ComponentFixture<SchoolAccountantNoticeComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ SchoolAccountantNoticeComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(SchoolAccountantNoticeComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should be created', () => {
    expect(component).toBeTruthy();
  });
});
