import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { SchoolAccountantFeesEditComponent } from './school-accountant-fees-edit.component';

describe('SchoolAccountantFeesEditComponent', () => {
  let component: SchoolAccountantFeesEditComponent;
  let fixture: ComponentFixture<SchoolAccountantFeesEditComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ SchoolAccountantFeesEditComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(SchoolAccountantFeesEditComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should be created', () => {
    expect(component).toBeTruthy();
  });
});
