import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { SchoolAdminMasterEntryPeriodViewComponent } from './school-admin-master-entry-period-view.component';

describe('SchoolAdminMasterEntryPeriodViewComponent', () => {
  let component: SchoolAdminMasterEntryPeriodViewComponent;
  let fixture: ComponentFixture<SchoolAdminMasterEntryPeriodViewComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ SchoolAdminMasterEntryPeriodViewComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(SchoolAdminMasterEntryPeriodViewComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should be created', () => {
    expect(component).toBeTruthy();
  });
});
