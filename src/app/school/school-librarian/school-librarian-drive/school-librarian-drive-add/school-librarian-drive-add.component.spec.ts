import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { SchoolLibrarianDriveAddComponent } from './school-librarian-drive-add.component';

describe('SchoolLibrarianDriveAddComponent', () => {
  let component: SchoolLibrarianDriveAddComponent;
  let fixture: ComponentFixture<SchoolLibrarianDriveAddComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ SchoolLibrarianDriveAddComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(SchoolLibrarianDriveAddComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should be created', () => {
    expect(component).toBeTruthy();
  });
});
