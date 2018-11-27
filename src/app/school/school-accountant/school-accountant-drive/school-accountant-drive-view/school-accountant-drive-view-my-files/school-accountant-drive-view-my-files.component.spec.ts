import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { SchoolAccountantDriveViewMyFilesComponent } from './school-accountant-drive-view-my-files.component';

describe('SchoolAccountantDriveViewMyFilesComponent', () => {
  let component: SchoolAccountantDriveViewMyFilesComponent;
  let fixture: ComponentFixture<SchoolAccountantDriveViewMyFilesComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ SchoolAccountantDriveViewMyFilesComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(SchoolAccountantDriveViewMyFilesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should be created', () => {
    expect(component).toBeTruthy();
  });
});
