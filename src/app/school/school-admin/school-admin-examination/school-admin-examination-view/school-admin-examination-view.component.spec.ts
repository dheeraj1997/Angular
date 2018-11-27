import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { SchoolAdminExaminationViewComponent } from './school-admin-examination-view.component';

describe('SchoolAdminExaminationViewComponent', () => {
  let component: SchoolAdminExaminationViewComponent;
  let fixture: ComponentFixture<SchoolAdminExaminationViewComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ SchoolAdminExaminationViewComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(SchoolAdminExaminationViewComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should be created', () => {
    expect(component).toBeTruthy();
  });
});
