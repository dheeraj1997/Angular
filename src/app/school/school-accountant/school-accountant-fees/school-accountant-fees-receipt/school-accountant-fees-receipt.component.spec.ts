import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { SchoolAccountantFeesReceiptComponent } from './school-accountant-fees-receipt.component';

describe('SchoolAccountantFeesReceiptComponent', () => {
  let component: SchoolAccountantFeesReceiptComponent;
  let fixture: ComponentFixture<SchoolAccountantFeesReceiptComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ SchoolAccountantFeesReceiptComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(SchoolAccountantFeesReceiptComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should be created', () => {
    expect(component).toBeTruthy();
  });
});
