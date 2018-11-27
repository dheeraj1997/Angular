import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { SchoolAccountantLedgerComponent } from './school-accountant-ledger.component';

describe('SchoolAccountantLedgerComponent', () => {
  let component: SchoolAccountantLedgerComponent;
  let fixture: ComponentFixture<SchoolAccountantLedgerComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ SchoolAccountantLedgerComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(SchoolAccountantLedgerComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should be created', () => {
    expect(component).toBeTruthy();
  });
});
