import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { SchoolAdminMasterEntrySubjectAddComponent } from './school-admin-master-entry-subject-add.component';

describe('SchoolAdminMasterEntrySubjectAddComponent', () => {
  let component: SchoolAdminMasterEntrySubjectAddComponent;
  let fixture: ComponentFixture<SchoolAdminMasterEntrySubjectAddComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ SchoolAdminMasterEntrySubjectAddComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(SchoolAdminMasterEntrySubjectAddComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should be created', () => {
    expect(component).toBeTruthy();
  });
});
