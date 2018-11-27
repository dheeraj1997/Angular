import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { SchoolRegistrarComponent } from './school-registrar.component';

describe('SchoolRegistrarComponent', () => {
  let component: SchoolRegistrarComponent;
  let fixture: ComponentFixture<SchoolRegistrarComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ SchoolRegistrarComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(SchoolRegistrarComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should be created', () => {
    expect(component).toBeTruthy();
  });
});
