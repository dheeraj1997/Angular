import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { SchoolAdminMasterEntryFeeComponent } from './school-admin-master-entry-fee.component';

describe('SchoolAdminMasterEntryFeeComponent', () => {
  let component: SchoolAdminMasterEntryFeeComponent;
  let fixture: ComponentFixture<SchoolAdminMasterEntryFeeComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ SchoolAdminMasterEntryFeeComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(SchoolAdminMasterEntryFeeComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should be created', () => {
    expect(component).toBeTruthy();
  });
});
