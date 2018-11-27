import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { SchoolLibrarianComponent } from './school-librarian.component';

describe('SchoolLibrarianComponent', () => {
  let component: SchoolLibrarianComponent;
  let fixture: ComponentFixture<SchoolLibrarianComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ SchoolLibrarianComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(SchoolLibrarianComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should be created', () => {
    expect(component).toBeTruthy();
  });
});
