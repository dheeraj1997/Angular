import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { AdminEmployeeSchoolComponent } from './admin-employee-school.component';

describe('AdminEmployeeSchoolComponent', () => {
  let component: AdminEmployeeSchoolComponent;
  let fixture: ComponentFixture<AdminEmployeeSchoolComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ AdminEmployeeSchoolComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AdminEmployeeSchoolComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should be created', () => {
    expect(component).toBeTruthy();
  });
});
