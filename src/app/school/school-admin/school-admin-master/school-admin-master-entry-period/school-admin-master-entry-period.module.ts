import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {Routes, RouterModule} from '@angular/router';
import {NgbModule} from '@ng-bootstrap/ng-bootstrap';
import {FormsModule} from '@angular/forms';

import {SchoolService} from '../../../../shared/services/school.service';
import {SubjectService} from '../../../../shared/services/subject.service';
import {TeacherService} from '../../../../shared/services/teacher.service';
import {ClassService} from '../../../../shared/services/class.service';
import {TimeTableService} from '../../../../shared/services/timeTable.service';
import {SessionService} from '../../../../shared/services/session.service';
import {MomentModule} from 'angular2-moment';
import {SchoolAdminMasterEntryPeriodComponent} from './school-admin-master-entry-period.component';
import {SchoolAdminMasterEntryPeriodAddComponent} from './school-admin-master-entry-period-add/school-admin-master-entry-period-add.component';
import {SchoolAdminMasterEntryPeriodEditComponent} from './school-admin-master-entry-period-edit/school-admin-master-entry-period-edit.component';
import {SchoolAdminMasterEntryPeriodViewComponent} from './school-admin-master-entry-period-view/school-admin-master-entry-period-view.component';

const routes: Routes = [
  {
    path: '',
    component: SchoolAdminMasterEntryPeriodComponent,
    children: [
      {
        path: 'add',
        component: SchoolAdminMasterEntryPeriodAddComponent,
        data: {
          heading: 'Add Class Timings'
        }
      }, {
        path: 'view',
        component: SchoolAdminMasterEntryPeriodViewComponent,
        data: {
          heading: 'View Class Timings'
        }
      },
      {
        path: 'edit',
        component: SchoolAdminMasterEntryPeriodEditComponent,
        data: {
          heading: 'Edit Class Timings'
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
    MomentModule,
    RouterModule.forChild(routes)
  ],
  providers: [
    SchoolService,
    TeacherService,
    ClassService,
    SubjectService,
    SessionService,
    TimeTableService
  ],
  declarations: [
    SchoolAdminMasterEntryPeriodComponent,
    SchoolAdminMasterEntryPeriodAddComponent,
    SchoolAdminMasterEntryPeriodEditComponent,
    SchoolAdminMasterEntryPeriodViewComponent
  ]
})
export class SchoolAdminMasterEntryPeriodModule {
}
