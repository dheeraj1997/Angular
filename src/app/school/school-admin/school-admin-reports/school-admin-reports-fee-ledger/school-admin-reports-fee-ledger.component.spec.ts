import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { SchoolAdminReportsFeeLedgerComponent } from './school-admin-reports-fee-ledger.component';

describe('SchoolAdminReportsFeeLedgerComponent', () => {
  let component: SchoolAdminReportsFeeLedgerComponent;
  let fixture: ComponentFixture<SchoolAdminReportsFeeLedgerComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ SchoolAdminReportsFeeLedgerComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(SchoolAdminReportsFeeLedgerComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should be created', () => {
    expect(component).toBeTruthy();
  });
});
