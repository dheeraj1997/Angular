import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { SchoolAdminMasterEntrySubjectComponent } from './school-admin-master-entry-subject.component';

describe('SchoolAdminMasterEntrySubjectComponent', () => {
  let component: SchoolAdminMasterEntrySubjectComponent;
  let fixture: ComponentFixture<SchoolAdminMasterEntrySubjectComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ SchoolAdminMasterEntrySubjectComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(SchoolAdminMasterEntrySubjectComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should be created', () => {
    expect(component).toBeTruthy();
  });
});
