import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { SchoolAccountantDriveFolderComponent } from './school-accountant-drive-folder.component';

describe('SchoolAccountantDriveFolderComponent', () => {
  let component: SchoolAccountantDriveFolderComponent;
  let fixture: ComponentFixture<SchoolAccountantDriveFolderComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ SchoolAccountantDriveFolderComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(SchoolAccountantDriveFolderComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should be created', () => {
    expect(component).toBeTruthy();
  });
});
