import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { SchoolAccountantDriveViewMainComponent } from './school-accountant-drive-view-main.component';

describe('SchoolAccountantDriveViewMainComponent', () => {
  let component: SchoolAccountantDriveViewMainComponent;
  let fixture: ComponentFixture<SchoolAccountantDriveViewMainComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ SchoolAccountantDriveViewMainComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(SchoolAccountantDriveViewMainComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should be created', () => {
    expect(component).toBeTruthy();
  });
});
