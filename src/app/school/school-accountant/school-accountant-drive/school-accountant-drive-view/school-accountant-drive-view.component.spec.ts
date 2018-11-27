import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { SchoolAccountantDriveViewComponent } from './school-accountant-drive-view.component';

describe('SchoolAccountantDriveViewComponent', () => {
  let component: SchoolAccountantDriveViewComponent;
  let fixture: ComponentFixture<SchoolAccountantDriveViewComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ SchoolAccountantDriveViewComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(SchoolAccountantDriveViewComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should be created', () => {
    expect(component).toBeTruthy();
  });
});
