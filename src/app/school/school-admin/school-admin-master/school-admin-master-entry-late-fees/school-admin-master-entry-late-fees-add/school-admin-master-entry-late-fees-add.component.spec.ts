import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { SchoolAdminMasterEntryLateFeesAddComponent } from './school-admin-master-entry-late-fees-add.component';

describe('SchoolAdminMasterEntryLateFeesAddComponent', () => {
  let component: SchoolAdminMasterEntryLateFeesAddComponent;
  let fixture: ComponentFixture<SchoolAdminMasterEntryLateFeesAddComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ SchoolAdminMasterEntryLateFeesAddComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(SchoolAdminMasterEntryLateFeesAddComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should be created', () => {
    expect(component).toBeTruthy();
  });
});
