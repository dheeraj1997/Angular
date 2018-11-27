import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { SchoolAccountantFeesComponent } from './school-accountant-fees.component';

describe('SchoolAccountantFeesComponent', () => {
  let component: SchoolAccountantFeesComponent;
  let fixture: ComponentFixture<SchoolAccountantFeesComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ SchoolAccountantFeesComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(SchoolAccountantFeesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should be created', () => {
    expect(component).toBeTruthy();
  });
});
