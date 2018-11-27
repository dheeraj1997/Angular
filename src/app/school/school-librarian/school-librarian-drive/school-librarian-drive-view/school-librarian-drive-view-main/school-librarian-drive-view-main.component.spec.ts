import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { SchoolLibrarianDriveViewMainComponent } from './school-librarian-drive-view-main.component';

describe('SchoolLibrarianDriveViewMainComponent', () => {
  let component: SchoolLibrarianDriveViewMainComponent;
  let fixture: ComponentFixture<SchoolLibrarianDriveViewMainComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ SchoolLibrarianDriveViewMainComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(SchoolLibrarianDriveViewMainComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should be created', () => {
    expect(component).toBeTruthy();
  });
});
