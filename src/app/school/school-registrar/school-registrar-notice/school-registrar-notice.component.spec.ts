import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { SchoolRegistrarNoticeComponent } from './school-registrar-notice.component';

describe('SchoolRegistrarNoticeComponent', () => {
  let component: SchoolRegistrarNoticeComponent;
  let fixture: ComponentFixture<SchoolRegistrarNoticeComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ SchoolRegistrarNoticeComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(SchoolRegistrarNoticeComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should be created', () => {
    expect(component).toBeTruthy();
  });
});
