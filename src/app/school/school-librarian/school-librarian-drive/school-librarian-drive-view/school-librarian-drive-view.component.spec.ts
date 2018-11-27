import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { SchoolLibrarianDriveViewComponent } from './school-librarian-drive-view.component';

describe('SchoolLibrarianDriveViewComponent', () => {
  let component: SchoolLibrarianDriveViewComponent;
  let fixture: ComponentFixture<SchoolLibrarianDriveViewComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ SchoolLibrarianDriveViewComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(SchoolLibrarianDriveViewComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should be created', () => {
    expect(component).toBeTruthy();
  });
});
