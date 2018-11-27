import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { SchoolAdminMasterEntryLateFeesMainComponent } from './school-admin-master-entry-late-fees-main.component';

describe('SchoolAdminMasterEntryLateFeesMainComponent', () => {
  let component: SchoolAdminMasterEntryLateFeesMainComponent;
  let fixture: ComponentFixture<SchoolAdminMasterEntryLateFeesMainComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ SchoolAdminMasterEntryLateFeesMainComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(SchoolAdminMasterEntryLateFeesMainComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should be created', () => {
    expect(component).toBeTruthy();
  });
});
