import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { SchoolAdminMasterEntryPeriodAddComponent } from './school-admin-master-entry-period-add.component';

describe('SchoolAdminMasterEntryPeriodAddComponent', () => {
  let component: SchoolAdminMasterEntryPeriodAddComponent;
  let fixture: ComponentFixture<SchoolAdminMasterEntryPeriodAddComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ SchoolAdminMasterEntryPeriodAddComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(SchoolAdminMasterEntryPeriodAddComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should be created', () => {
    expect(component).toBeTruthy();
  });
});
