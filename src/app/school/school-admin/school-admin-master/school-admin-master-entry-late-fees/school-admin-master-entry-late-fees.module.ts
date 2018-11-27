import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import {Routes, RouterModule} from '@angular/router';
import {NgbModule} from '@ng-bootstrap/ng-bootstrap';
import { SchoolAdminMasterEntryLateFeesAddComponent } from './school-admin-master-entry-late-fees-add/school-admin-master-entry-late-fees-add.component';
import { SchoolAdminMasterEntryLateFeesEditComponent } from './school-admin-master-entry-late-fees-edit/school-admin-master-entry-late-fees-edit.component';
import { SchoolAdminMasterEntryLateFeesComponent } from './school-admin-master-entry-late-fees.component';
import { SchoolAdminMasterEntryLateFeesMainComponent } from './school-admin-master-entry-late-fees-main/school-admin-master-entry-late-fees-main.component';
import { SchoolAdminMasterEntryLateFeesViewComponent } from './school-admin-master-entry-late-fees-view/school-admin-master-entry-late-fees-view.component';

const routes: Routes = [
{
  path: '',
  component: SchoolAdminMasterEntryLateFeesComponent,
  children: [
  {
    path: 'main',
    component: SchoolAdminMasterEntryLateFeesMainComponent,
    data: {
      heading: 'Late-Fee'
    }
  }, 
  {
    path: 'edit',
    component: SchoolAdminMasterEntryLateFeesEditComponent,
    data: {
      heading: 'Edit Late-Fee'
    }
  }
  ]
}
];


@NgModule({
	imports: [
	CommonModule,
	NgbModule,
	RouterModule.forChild(routes)
	],
	declarations: [SchoolAdminMasterEntryLateFeesComponent,
	SchoolAdminMasterEntryLateFeesAddComponent,
	SchoolAdminMasterEntryLateFeesEditComponent,
	SchoolAdminMasterEntryLateFeesMainComponent,
	SchoolAdminMasterEntryLateFeesViewComponent]
})
export class SchoolAdminMasterEntryLateFeesModule { }
