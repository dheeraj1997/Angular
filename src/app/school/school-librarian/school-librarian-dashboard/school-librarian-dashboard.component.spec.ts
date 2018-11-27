import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { SchoolLibrarianDashboardComponent } from './school-librarian-dashboard.component';

describe('SchoolLibrarianDashboardComponent', () => {
  let component: SchoolLibrarianDashboardComponent;
  let fixture: ComponentFixture<SchoolLibrarianDashboardComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ SchoolLibrarianDashboardComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(SchoolLibrarianDashboardComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should be created', () => {
    expect(component).toBeTruthy();
  });
});
