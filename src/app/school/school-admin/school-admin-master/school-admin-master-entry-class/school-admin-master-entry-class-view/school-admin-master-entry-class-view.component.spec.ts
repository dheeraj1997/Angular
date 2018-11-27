import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { SchoolAdminMasterEntryClassViewComponent } from './school-admin-master-entry-class-view.component';

describe('SchoolAdminMasterEntryClassViewComponent', () => {
  let component: SchoolAdminMasterEntryClassViewComponent;
  let fixture: ComponentFixture<SchoolAdminMasterEntryClassViewComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ SchoolAdminMasterEntryClassViewComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(SchoolAdminMasterEntryClassViewComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should be created', () => {
    expect(component).toBeTruthy();
  });
});
