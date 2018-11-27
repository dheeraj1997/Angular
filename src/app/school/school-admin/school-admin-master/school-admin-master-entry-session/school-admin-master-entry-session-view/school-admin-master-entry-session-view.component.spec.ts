import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { SchoolAdminMasterEntrySessionViewComponent } from './school-admin-master-entry-session-view.component';

describe('SchoolAdminMasterEntrySessionViewComponent', () => {
  let component: SchoolAdminMasterEntrySessionViewComponent;
  let fixture: ComponentFixture<SchoolAdminMasterEntrySessionViewComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ SchoolAdminMasterEntrySessionViewComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(SchoolAdminMasterEntrySessionViewComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should be created', () => {
    expect(component).toBeTruthy();
  });
});
