import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { SchoolAdminExaminationAddComponent } from './school-admin-examination-add.component';

describe('SchoolAdminExaminationAddComponent', () => {
  let component: SchoolAdminExaminationAddComponent;
  let fixture: ComponentFixture<SchoolAdminExaminationAddComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ SchoolAdminExaminationAddComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(SchoolAdminExaminationAddComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should be created', () => {
    expect(component).toBeTruthy();
  });
});
