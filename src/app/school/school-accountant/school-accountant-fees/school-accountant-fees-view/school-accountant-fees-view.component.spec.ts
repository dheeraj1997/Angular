import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { SchoolAccountantFeesViewComponent } from './school-accountant-fees-view.component';

describe('SchoolAccountantFeesViewComponent', () => {
  let component: SchoolAccountantFeesViewComponent;
  let fixture: ComponentFixture<SchoolAccountantFeesViewComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ SchoolAccountantFeesViewComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(SchoolAccountantFeesViewComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should be created', () => {
    expect(component).toBeTruthy();
  });
});
