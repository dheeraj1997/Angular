import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { SchoolAccountantDriveAddComponent } from './school-accountant-drive-add.component';

describe('SchoolAccountantDriveAddComponent', () => {
  let component: SchoolAccountantDriveAddComponent;
  let fixture: ComponentFixture<SchoolAccountantDriveAddComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ SchoolAccountantDriveAddComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(SchoolAccountantDriveAddComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should be created', () => {
    expect(component).toBeTruthy();
  });
});
