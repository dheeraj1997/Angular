import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { SchoolLibrarianDriveComponent } from './school-librarian-drive.component';

describe('SchoolLibrarianDriveComponent', () => {
  let component: SchoolLibrarianDriveComponent;
  let fixture: ComponentFixture<SchoolLibrarianDriveComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ SchoolLibrarianDriveComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(SchoolLibrarianDriveComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should be created', () => {
    expect(component).toBeTruthy();
  });
});
