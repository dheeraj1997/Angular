import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { AdminEmployeeSchoolViewComponent } from './admin-employee-school-view.component';

describe('AdminEmployeeSchoolViewComponent', () => {
  let component: AdminEmployeeSchoolViewComponent;
  let fixture: ComponentFixture<AdminEmployeeSchoolViewComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ AdminEmployeeSchoolViewComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AdminEmployeeSchoolViewComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should be created', () => {
    expect(component).toBeTruthy();
  });
});
