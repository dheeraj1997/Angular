import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { SchoolAccountantFeesAddComponent } from './school-accountant-fees-add.component';

describe('SchoolAccountantFeesAddComponent', () => {
  let component: SchoolAccountantFeesAddComponent;
  let fixture: ComponentFixture<SchoolAccountantFeesAddComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ SchoolAccountantFeesAddComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(SchoolAccountantFeesAddComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should be created', () => {
    expect(component).toBeTruthy();
  });
});
