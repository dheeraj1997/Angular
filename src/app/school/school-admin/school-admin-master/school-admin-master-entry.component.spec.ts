import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { SchoolAdminMasterEntryComponent } from './school-admin-master-entry.component';

describe('SchoolAdminMasterEntryComponent', () => {
  let component: SchoolAdminMasterEntryComponent;
  let fixture: ComponentFixture<SchoolAdminMasterEntryComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ SchoolAdminMasterEntryComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(SchoolAdminMasterEntryComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should be created', () => {
    expect(component).toBeTruthy();
  });
});
