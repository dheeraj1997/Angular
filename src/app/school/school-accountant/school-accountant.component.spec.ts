


import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { SchoolAccountantComponent } from './school-accountant.component';

describe('SchoolAccountantComponent', () => {
  let component: SchoolAccountantComponent;
  let fixture: ComponentFixture<SchoolAccountantComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ SchoolAccountantComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(SchoolAccountantComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should be created', () => {
    expect(component).toBeTruthy();
  });
});
