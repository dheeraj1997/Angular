import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { SchoolAccountantDriveComponent } from './school-accountant-drive.component';

describe('SchoolAccountantDriveComponent', () => {
  let component: SchoolAccountantDriveComponent;
  let fixture: ComponentFixture<SchoolAccountantDriveComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ SchoolAccountantDriveComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(SchoolAccountantDriveComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should be created', () => {
    expect(component).toBeTruthy();
  });
});
