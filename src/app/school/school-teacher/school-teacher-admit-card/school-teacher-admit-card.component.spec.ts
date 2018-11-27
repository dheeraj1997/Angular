import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { SchoolTeacherAdmitCardComponent } from './school-teacher-admit-card.component';

describe('SchoolTeacherAdmitCardComponent', () => {
  let component: SchoolTeacherAdmitCardComponent;
  let fixture: ComponentFixture<SchoolTeacherAdmitCardComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ SchoolTeacherAdmitCardComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(SchoolTeacherAdmitCardComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should be created', () => {
    expect(component).toBeTruthy();
  });
});
