import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { SchoolAdminMasterEntryPeriodEditComponent } from './school-admin-master-entry-period-edit.component';

describe('SchoolAdminMasterEntryPeriodEditComponent', () => {
  let component: SchoolAdminMasterEntryPeriodEditComponent;
  let fixture: ComponentFixture<SchoolAdminMasterEntryPeriodEditComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ SchoolAdminMasterEntryPeriodEditComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(SchoolAdminMasterEntryPeriodEditComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should be created', () => {
    expect(component).toBeTruthy();
  });
});
