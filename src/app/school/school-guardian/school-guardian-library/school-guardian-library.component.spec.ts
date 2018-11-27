import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { SchoolGuardianLibraryComponent } from './school-guardian-library.component';

describe('SchoolGuardianLibraryComponent', () => {
  let component: SchoolGuardianLibraryComponent;
  let fixture: ComponentFixture<SchoolGuardianLibraryComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ SchoolGuardianLibraryComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(SchoolGuardianLibraryComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should be created', () => {
    expect(component).toBeTruthy();
  });
});
