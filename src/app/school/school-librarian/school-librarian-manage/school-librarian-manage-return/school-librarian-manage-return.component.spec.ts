import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { SchoolLibrarianManageReturnComponent } from './school-librarian-manage-return.component';

describe('SchoolLibrarianManageReturnComponent', () => {
  let component: SchoolLibrarianManageReturnComponent;
  let fixture: ComponentFixture<SchoolLibrarianManageReturnComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ SchoolLibrarianManageReturnComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(SchoolLibrarianManageReturnComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should be created', () => {
    expect(component).toBeTruthy();
  });
});
