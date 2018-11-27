import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { SchoolGuardianHomeworkComponent } from './school-guardian-homework.component';

describe('SchoolGuardianHomeworkComponent', () => {
  let component: SchoolGuardianHomeworkComponent;
  let fixture: ComponentFixture<SchoolGuardianHomeworkComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ SchoolGuardianHomeworkComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(SchoolGuardianHomeworkComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should be created', () => {
    expect(component).toBeTruthy();
  });
});
