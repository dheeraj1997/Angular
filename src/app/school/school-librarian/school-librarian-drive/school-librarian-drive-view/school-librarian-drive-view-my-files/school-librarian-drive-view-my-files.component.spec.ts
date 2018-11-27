import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { SchoolLibrarianDriveViewMyFilesComponent } from './school-librarian-drive-view-my-files.component';

describe('SchoolLibrarianDriveViewMyFilesComponent', () => {
  let component: SchoolLibrarianDriveViewMyFilesComponent;
  let fixture: ComponentFixture<SchoolLibrarianDriveViewMyFilesComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ SchoolLibrarianDriveViewMyFilesComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(SchoolLibrarianDriveViewMyFilesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should be created', () => {
    expect(component).toBeTruthy();
  });
});
