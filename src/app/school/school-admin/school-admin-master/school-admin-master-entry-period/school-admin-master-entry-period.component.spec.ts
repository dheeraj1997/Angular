import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { SchoolAdminMasterEntryPeriodComponent } from './school-admin-master-entry-period.component';

describe('SchoolAdminMasterEntryPeriodComponent', () => {
  let component: SchoolAdminMasterEntryPeriodComponent;
  let fixture: ComponentFixture<SchoolAdminMasterEntryPeriodComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ SchoolAdminMasterEntryPeriodComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(SchoolAdminMasterEntryPeriodComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should be created', () => {
    expect(component).toBeTruthy();
  });
});
