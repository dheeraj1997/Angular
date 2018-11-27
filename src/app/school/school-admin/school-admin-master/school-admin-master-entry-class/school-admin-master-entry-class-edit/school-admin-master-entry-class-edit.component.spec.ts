import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { SchoolAdminMasterEntryClassEditComponent } from './school-admin-master-entry-class-edit.component';

describe('SchoolAdminMasterEntryClassEditComponent', () => {
  let component: SchoolAdminMasterEntryClassEditComponent;
  let fixture: ComponentFixture<SchoolAdminMasterEntryClassEditComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ SchoolAdminMasterEntryClassEditComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(SchoolAdminMasterEntryClassEditComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should be created', () => {
    expect(component).toBeTruthy();
  });
});
