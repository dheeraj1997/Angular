import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { SchoolAccountantTransportEditComponent } from './school-accountant-transport-edit.component';

describe('SchoolAccountantTransportEditComponent', () => {
  let component: SchoolAccountantTransportEditComponent;
  let fixture: ComponentFixture<SchoolAccountantTransportEditComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ SchoolAccountantTransportEditComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(SchoolAccountantTransportEditComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should be created', () => {
    expect(component).toBeTruthy();
  });
});
