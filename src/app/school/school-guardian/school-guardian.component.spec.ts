import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { SchoolGuardianComponent } from './school-guardian.component';

describe('SchoolGuardianComponent', () => {
  let component: SchoolGuardianComponent;
  let fixture: ComponentFixture<SchoolGuardianComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ SchoolGuardianComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(SchoolGuardianComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should be created', () => {
    expect(component).toBeTruthy();
  });
});
