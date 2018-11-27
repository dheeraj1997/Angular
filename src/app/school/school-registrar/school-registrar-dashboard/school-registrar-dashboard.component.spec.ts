import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { SchoolRegistrarDashboardComponent } from './school-registrar-dashboard.component';

describe('SchoolRegistrarDashboardComponent', () => {
  let component: SchoolRegistrarDashboardComponent;
  let fixture: ComponentFixture<SchoolRegistrarDashboardComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ SchoolRegistrarDashboardComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(SchoolRegistrarDashboardComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should be created', () => {
    expect(component).toBeTruthy();
  });
});
