import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {Routes, RouterModule} from '@angular/router';
import {NgbModule} from '@ng-bootstrap/ng-bootstrap';
import {FormsModule} from '@angular/forms';

import {SchoolService} from '../../../../shared/services/school.service';
import {ClassService} from '../../../../shared/services/class.service';
import {SchoolAdminMasterEntryClassComponent} from './school-admin-master-entry-class.component';
import {SchoolAdminMasterEntryClassAddComponent} from './school-admin-master-entry-class-add/school-admin-master-entry-class-add.component';
import {SchoolAdminMasterEntryClassEditComponent} from './school-admin-master-entry-class-edit/school-admin-master-entry-class-edit.component';
import {SchoolAdminMasterEntryClassViewComponent} from './school-admin-master-entry-class-view/school-admin-master-entry-class-view.component';

const routes: Routes = [
  {
    path: '',
    component: SchoolAdminMasterEntryClassComponent,
    children: [
      {
        path: 'add',
        component: SchoolAdminMasterEntryClassAddComponent,
        data: {
          heading: 'Add Class'
        }
      }, {
        path: 'view',
        component: SchoolAdminMasterEntryClassViewComponent,
        data: {
          heading: 'View Class'
        }
      },
      {
        path: 'edit/:classId',
        component: SchoolAdminMasterEntryClassEditComponent,
        data: {
          heading: 'Edit Class'
        }
      }
    ]
  }
];


@NgModule({
  imports: [
    CommonModule,
    NgbModule,
    FormsModule,
    RouterModule.forChild(routes)
  ],
  providers: [
    SchoolService,
    ClassService
  ],
  declarations: [SchoolAdminMasterEntryClassComponent, SchoolAdminMasterEntryClassAddComponent, SchoolAdminMasterEntryClassEditComponent, SchoolAdminMasterEntryClassViewComponent]
})
export class SchoolAdminMasterEntryClassModule {
}
