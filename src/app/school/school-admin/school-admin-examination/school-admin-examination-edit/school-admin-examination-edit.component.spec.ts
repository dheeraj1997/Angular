import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { SchoolAdminExaminationEditComponent } from './school-admin-examination-edit.component';

describe('SchoolAdminExaminationEditComponent', () => {
  let component: SchoolAdminExaminationEditComponent;
  let fixture: ComponentFixture<SchoolAdminExaminationEditComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ SchoolAdminExaminationEditComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(SchoolAdminExaminationEditComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should be created', () => {
    expect(component).toBeTruthy();
  });
});
