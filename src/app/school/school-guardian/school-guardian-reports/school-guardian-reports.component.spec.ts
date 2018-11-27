import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { SchoolGuardianReportsComponent } from './school-guardian-reports.component';

describe('SchoolGuardianReportsComponent', () => {
  let component: SchoolGuardianReportsComponent;
  let fixture: ComponentFixture<SchoolGuardianReportsComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ SchoolGuardianReportsComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(SchoolGuardianReportsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should be created', () => {
    expect(component).toBeTruthy();
  });
});
