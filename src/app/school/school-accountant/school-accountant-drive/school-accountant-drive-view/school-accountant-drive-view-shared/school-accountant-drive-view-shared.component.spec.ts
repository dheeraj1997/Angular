import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { SchoolAccountantDriveViewSharedComponent } from './school-accountant-drive-view-shared.component';

describe('SchoolAccountantDriveViewSharedComponent', () => {
  let component: SchoolAccountantDriveViewSharedComponent;
  let fixture: ComponentFixture<SchoolAccountantDriveViewSharedComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ SchoolAccountantDriveViewSharedComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(SchoolAccountantDriveViewSharedComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should be created', () => {
    expect(component).toBeTruthy();
  });
});
