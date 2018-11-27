import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { AdminEmployeeSchoolEditComponent } from './admin-employee-school-edit.component';

describe('AdminEmployeeSchoolEditComponent', () => {
  let component: AdminEmployeeSchoolEditComponent;
  let fixture: ComponentFixture<AdminEmployeeSchoolEditComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ AdminEmployeeSchoolEditComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AdminEmployeeSchoolEditComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should be created', () => {
    expect(component).toBeTruthy();
  });
});
