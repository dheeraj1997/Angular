import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { SchoolAccountantExpensesAddComponent } from './school-accountant-expenses-add.component';

describe('SchoolAccountantExpensesAddComponent', () => {
  let component: SchoolAccountantExpensesAddComponent;
  let fixture: ComponentFixture<SchoolAccountantExpensesAddComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ SchoolAccountantExpensesAddComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(SchoolAccountantExpensesAddComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should be created', () => {
    expect(component).toBeTruthy();
  });
});
