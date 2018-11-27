import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { SchoolLibrarianDriveViewFolderComponent } from './school-librarian-drive-view-folder.component';

describe('SchoolLibrarianDriveViewFolderComponent', () => {
  let component: SchoolLibrarianDriveViewFolderComponent;
  let fixture: ComponentFixture<SchoolLibrarianDriveViewFolderComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ SchoolLibrarianDriveViewFolderComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(SchoolLibrarianDriveViewFolderComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should be created', () => {
    expect(component).toBeTruthy();
  });
});
