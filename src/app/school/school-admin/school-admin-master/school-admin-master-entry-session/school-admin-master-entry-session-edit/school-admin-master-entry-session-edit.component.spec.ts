import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { SchoolAdminMasterEntrySessionEditComponent } from './school-admin-master-entry-session-edit.component';

describe('SchoolAdminMasterEntrySessionEditComponent', () => {
  let component: SchoolAdminMasterEntrySessionEditComponent;
  let fixture: ComponentFixture<SchoolAdminMasterEntrySessionEditComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ SchoolAdminMasterEntrySessionEditComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(SchoolAdminMasterEntrySessionEditComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should be created', () => {
    expect(component).toBeTruthy();
  });
});
