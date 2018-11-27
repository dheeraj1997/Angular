import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { SchoolAccountantExpensesCatagoryComponent } from './school-accountant-expenses-catagory.component';

describe('SchoolAccountantExpensesCatagoryComponent', () => {
  let component: SchoolAccountantExpensesCatagoryComponent;
  let fixture: ComponentFixture<SchoolAccountantExpensesCatagoryComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ SchoolAccountantExpensesCatagoryComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(SchoolAccountantExpensesCatagoryComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should be created', () => {
    expect(component).toBeTruthy();
  });
});
