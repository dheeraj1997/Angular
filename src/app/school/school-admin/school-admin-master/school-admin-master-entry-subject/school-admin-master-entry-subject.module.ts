import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {Routes, RouterModule} from '@angular/router';
import {NgbModule} from '@ng-bootstrap/ng-bootstrap';
import {FormsModule} from '@angular/forms';

import {SchoolService} from '../../../../shared/services/school.service';
import {SubjectService} from '../../../../shared/services/subject.service';
import {SchoolAdminMasterEntrySubjectComponent} from './school-admin-master-entry-subject.component';
import {SchoolAdminMasterEntrySubjectAddComponent} from './school-admin-master-entry-subject-add/school-admin-master-entry-subject-add.component';
import {SchoolAdminMasterEntrySubjectEditComponent} from './school-admin-master-entry-subject-edit/school-admin-master-entry-subject-edit.component';
import {SchoolAdminMasterEntrySubjectViewComponent} from './school-admin-master-entry-subject-view/school-admin-master-entry-subject-view.component';

const routes: Routes = [
  {
    path: '',
    component: SchoolAdminMasterEntrySubjectComponent,
    children: [
      {
        path: 'add',
        component: SchoolAdminMasterEntrySubjectAddComponent,
        data: {
          heading: 'Add Subject'
        }
      }, {
        path: 'view',
        component: SchoolAdminMasterEntrySubjectViewComponent,
        data: {
          heading: 'View Subject'
        }
      },
      {
        path: 'edit/:subjectId',
        component: SchoolAdminMasterEntrySubjectEditComponent,
        data: {
          heading: 'Edit Subject'
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
    SubjectService
  ],
  declarations: [SchoolAdminMasterEntrySubjectComponent, SchoolAdminMasterEntrySubjectAddComponent, SchoolAdminMasterEntrySubjectEditComponent, SchoolAdminMasterEntrySubjectViewComponent]
})
export class SchoolAdminMasterEntrySubjectModule {
}
