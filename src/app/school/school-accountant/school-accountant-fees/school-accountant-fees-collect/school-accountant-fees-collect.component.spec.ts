import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { SchoolAccountantFeesCollectComponent } from './school-accountant-fees-collect.component';

describe('SchoolAccountantFeesCollectComponent', () => {
  let component: SchoolAccountantFeesCollectComponent;
  let fixture: ComponentFixture<SchoolAccountantFeesCollectComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ SchoolAccountantFeesCollectComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(SchoolAccountantFeesCollectComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should be created', () => {
    expect(component).toBeTruthy();
  });
});
