import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { SchoolAccountantTransportViewComponent } from './school-accountant-transport-view.component';

describe('SchoolAccountantTransportViewComponent', () => {
  let component: SchoolAccountantTransportViewComponent;
  let fixture: ComponentFixture<SchoolAccountantTransportViewComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ SchoolAccountantTransportViewComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(SchoolAccountantTransportViewComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should be created', () => {
    expect(component).toBeTruthy();
  });
});
