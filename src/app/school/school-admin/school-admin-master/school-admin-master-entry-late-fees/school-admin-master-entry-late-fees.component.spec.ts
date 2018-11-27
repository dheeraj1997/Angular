import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { SchoolAdminMasterEntryLateFeesComponent } from './school-admin-master-entry-late-fees.component';

describe('SchoolAdminMasterEntryLateFeesComponent', () => {
  let component: SchoolAdminMasterEntryLateFeesComponent;
  let fixture: ComponentFixture<SchoolAdminMasterEntryLateFeesComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ SchoolAdminMasterEntryLateFeesComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(SchoolAdminMasterEntryLateFeesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should be created', () => {
    expect(component).toBeTruthy();
  });
});
