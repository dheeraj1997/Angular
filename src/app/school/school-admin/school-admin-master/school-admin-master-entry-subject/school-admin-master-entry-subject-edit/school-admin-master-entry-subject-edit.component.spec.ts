import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { SchoolAdminMasterEntrySubjectEditComponent } from './school-admin-master-entry-subject-edit.component';

describe('SchoolAdminMasterEntrySubjectEditComponent', () => {
  let component: SchoolAdminMasterEntrySubjectEditComponent;
  let fixture: ComponentFixture<SchoolAdminMasterEntrySubjectEditComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ SchoolAdminMasterEntrySubjectEditComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(SchoolAdminMasterEntrySubjectEditComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should be created', () => {
    expect(component).toBeTruthy();
  });
});
