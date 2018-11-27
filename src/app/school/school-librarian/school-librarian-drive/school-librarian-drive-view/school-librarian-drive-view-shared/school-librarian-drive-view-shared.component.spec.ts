import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { SchoolLibrarianDriveViewSharedComponent } from './school-librarian-drive-view-shared.component';

describe('SchoolLibrarianDriveViewSharedComponent', () => {
  let component: SchoolLibrarianDriveViewSharedComponent;
  let fixture: ComponentFixture<SchoolLibrarianDriveViewSharedComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ SchoolLibrarianDriveViewSharedComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(SchoolLibrarianDriveViewSharedComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should be created', () => {
    expect(component).toBeTruthy();
  });
});
