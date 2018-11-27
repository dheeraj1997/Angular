import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { AdminEmployeeSchoolAddComponent } from './admin-employee-school-add.component';

describe('AdminEmployeeSchoolAddComponent', () => {
  let component: AdminEmployeeSchoolAddComponent;
  let fixture: ComponentFixture<AdminEmployeeSchoolAddComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ AdminEmployeeSchoolAddComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AdminEmployeeSchoolAddComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should be created', () => {
    expect(component).toBeTruthy();
  });
});
