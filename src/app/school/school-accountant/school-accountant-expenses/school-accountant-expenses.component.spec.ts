import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { SchoolAccountantExpensesComponent } from './school-accountant-expenses.component';

describe('SchoolAccountantExpensesComponent', () => {
  let component: SchoolAccountantExpensesComponent;
  let fixture: ComponentFixture<SchoolAccountantExpensesComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ SchoolAccountantExpensesComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(SchoolAccountantExpensesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should be created', () => {
    expect(component).toBeTruthy();
  });
});
