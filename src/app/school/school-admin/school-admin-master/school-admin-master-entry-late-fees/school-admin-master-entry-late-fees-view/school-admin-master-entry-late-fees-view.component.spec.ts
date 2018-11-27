import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { SchoolAdminMasterEntryLateFeesViewComponent } from './school-admin-master-entry-late-fees-view.component';

describe('SchoolAdminMasterEntryLateFeesViewComponent', () => {
  let component: SchoolAdminMasterEntryLateFeesViewComponent;
  let fixture: ComponentFixture<SchoolAdminMasterEntryLateFeesViewComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ SchoolAdminMasterEntryLateFeesViewComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(SchoolAdminMasterEntryLateFeesViewComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should be created', () => {
    expect(component).toBeTruthy();
  });
});
