import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { SchoolAccountantExpensesEditComponent } from './school-accountant-expenses-edit.component';

describe('SchoolAccountantExpensesEditComponent', () => {
  let component: SchoolAccountantExpensesEditComponent;
  let fixture: ComponentFixture<SchoolAccountantExpensesEditComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ SchoolAccountantExpensesEditComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(SchoolAccountantExpensesEditComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should be created', () => {
    expect(component).toBeTruthy();
  });
});
