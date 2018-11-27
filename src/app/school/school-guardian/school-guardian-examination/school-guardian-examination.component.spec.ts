import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { SchoolGuardianExaminationComponent } from './school-guardian-examination.component';

describe('SchoolGuardianExaminationComponent', () => {
  let component: SchoolGuardianExaminationComponent;
  let fixture: ComponentFixture<SchoolGuardianExaminationComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ SchoolGuardianExaminationComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(SchoolGuardianExaminationComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should be created', () => {
    expect(component).toBeTruthy();
  });
});
