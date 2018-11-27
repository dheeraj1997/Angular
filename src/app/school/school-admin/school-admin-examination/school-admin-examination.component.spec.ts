import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { SchoolAdminExaminationComponent } from './school-admin-examination.component';

describe('SchoolAdminExaminationComponent', () => {
  let component: SchoolAdminExaminationComponent;
  let fixture: ComponentFixture<SchoolAdminExaminationComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ SchoolAdminExaminationComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(SchoolAdminExaminationComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should be created', () => {
    expect(component).toBeTruthy();
  });
});
