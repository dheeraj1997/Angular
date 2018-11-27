import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { SchoolAdminMasterEntryLateFeesEditComponent } from './school-admin-master-entry-late-fees-edit.component';

describe('SchoolAdminMasterEntryLateFeesEditComponent', () => {
  let component: SchoolAdminMasterEntryLateFeesEditComponent;
  let fixture: ComponentFixture<SchoolAdminMasterEntryLateFeesEditComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ SchoolAdminMasterEntryLateFeesEditComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(SchoolAdminMasterEntryLateFeesEditComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should be created', () => {
    expect(component).toBeTruthy();
  });
});
