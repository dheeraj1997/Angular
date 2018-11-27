import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { SchoolGuardianFeesComponent } from './school-guardian-fees.component';

describe('SchoolGuardianFeesComponent', () => {
  let component: SchoolGuardianFeesComponent;
  let fixture: ComponentFixture<SchoolGuardianFeesComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ SchoolGuardianFeesComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(SchoolGuardianFeesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should be created', () => {
    expect(component).toBeTruthy();
  });
});
