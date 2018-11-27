import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { SchoolAdminMasterEntryClassComponent } from './school-admin-master-entry-class.component';

describe('SchoolAdminMasterEntryClassComponent', () => {
  let component: SchoolAdminMasterEntryClassComponent;
  let fixture: ComponentFixture<SchoolAdminMasterEntryClassComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ SchoolAdminMasterEntryClassComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(SchoolAdminMasterEntryClassComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should be created', () => {
    expect(component).toBeTruthy();
  });
});
