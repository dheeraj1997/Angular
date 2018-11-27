import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { SchoolAdminMasterEntrySessionComponent } from './school-admin-master-entry-session.component';

describe('SchoolAdminMasterEntrySessionComponent', () => {
  let component: SchoolAdminMasterEntrySessionComponent;
  let fixture: ComponentFixture<SchoolAdminMasterEntrySessionComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ SchoolAdminMasterEntrySessionComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(SchoolAdminMasterEntrySessionComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should be created', () => {
    expect(component).toBeTruthy();
  });
});
