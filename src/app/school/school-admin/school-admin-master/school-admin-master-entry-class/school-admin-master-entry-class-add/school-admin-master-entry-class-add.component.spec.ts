import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { SchoolAdminMasterEntryClassAddComponent } from './school-admin-master-entry-class-add.component';

describe('SchoolAdminMasterEntryClassAddComponent', () => {
  let component: SchoolAdminMasterEntryClassAddComponent;
  let fixture: ComponentFixture<SchoolAdminMasterEntryClassAddComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ SchoolAdminMasterEntryClassAddComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(SchoolAdminMasterEntryClassAddComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should be created', () => {
    expect(component).toBeTruthy();
  });
});
