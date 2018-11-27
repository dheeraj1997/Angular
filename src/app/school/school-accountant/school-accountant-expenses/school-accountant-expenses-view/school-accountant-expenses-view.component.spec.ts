import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { SchoolAccountantExpensesViewComponent } from './school-accountant-expenses-view.component';

describe('SchoolAccountantExpensesViewComponent', () => {
  let component: SchoolAccountantExpensesViewComponent;
  let fixture: ComponentFixture<SchoolAccountantExpensesViewComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ SchoolAccountantExpensesViewComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(SchoolAccountantExpensesViewComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should be created', () => {
    expect(component).toBeTruthy();
  });
});
