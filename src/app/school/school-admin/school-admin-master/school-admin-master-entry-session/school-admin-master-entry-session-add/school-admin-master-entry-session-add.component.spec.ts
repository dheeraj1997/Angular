import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { SchoolAdminMasterEntrySessionAddComponent } from './school-admin-master-entry-session-add.component';

describe('SchoolAdminMasterEntrySessionAddComponent', () => {
  let component: SchoolAdminMasterEntrySessionAddComponent;
  let fixture: ComponentFixture<SchoolAdminMasterEntrySessionAddComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ SchoolAdminMasterEntrySessionAddComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(SchoolAdminMasterEntrySessionAddComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should be created', () => {
    expect(component).toBeTruthy();
  });
});
