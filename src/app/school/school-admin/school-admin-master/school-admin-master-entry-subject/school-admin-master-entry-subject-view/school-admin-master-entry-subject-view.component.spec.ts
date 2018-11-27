import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { SchoolAdminMasterEntrySubjectViewComponent } from './school-admin-master-entry-subject-view.component';

describe('SchoolAdminMasterEntrySubjectViewComponent', () => {
  let component: SchoolAdminMasterEntrySubjectViewComponent;
  let fixture: ComponentFixture<SchoolAdminMasterEntrySubjectViewComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ SchoolAdminMasterEntrySubjectViewComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(SchoolAdminMasterEntrySubjectViewComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should be created', () => {
    expect(component).toBeTruthy();
  });
});
