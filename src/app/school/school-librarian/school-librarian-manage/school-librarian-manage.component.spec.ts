import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { SchoolLibrarianManageComponent } from './school-librarian-manage.component';

describe('SchoolLibrarianManageComponent', () => {
  let component: SchoolLibrarianManageComponent;
  let fixture: ComponentFixture<SchoolLibrarianManageComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ SchoolLibrarianManageComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(SchoolLibrarianManageComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should be created', () => {
    expect(component).toBeTruthy();
  });
});
