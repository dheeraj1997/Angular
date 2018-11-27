import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { SchoolAccountantTransportComponent } from './school-accountant-transport.component';

describe('SchoolAccountantTransportComponent', () => {
  let component: SchoolAccountantTransportComponent;
  let fixture: ComponentFixture<SchoolAccountantTransportComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ SchoolAccountantTransportComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(SchoolAccountantTransportComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should be created', () => {
    expect(component).toBeTruthy();
  });
});
