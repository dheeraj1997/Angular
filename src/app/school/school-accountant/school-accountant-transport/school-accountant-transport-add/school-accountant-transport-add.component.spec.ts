import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { SchoolAccountantTransportAddComponent } from './school-accountant-transport-add.component';

describe('SchoolAccountantTransportAddComponent', () => {
  let component: SchoolAccountantTransportAddComponent;
  let fixture: ComponentFixture<SchoolAccountantTransportAddComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ SchoolAccountantTransportAddComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(SchoolAccountantTransportAddComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should be created', () => {
    expect(component).toBeTruthy();
  });
});
