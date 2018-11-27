import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {Routes, RouterModule} from '@angular/router';
import {NgbModule} from '@ng-bootstrap/ng-bootstrap';
import {FormsModule} from '@angular/forms';

import {SchoolService} from '../../../shared/services/school.service';
import {SubjectService} from '../../../shared/services/subject.service';
import {TeacherService} from '../../../shared/services/teacher.service';
import {ClassService} from '../../../shared/services/class.service';
import {TimeTableService} from '../../../shared/services/timeTable.service';
import {SchoolAdminMasterEntryComponent} from './school-admin-master-entry.component';

const routes: Routes = [
  {
    path: '',
    component: SchoolAdminMasterEntryComponent,
    children: [
      {
        path: 'session',
        loadChildren: './school-admin-master-entry-session/school-admin-master-entry-session.module#SchoolAdminMasterEntrySessionModule'
      }, {
        path: 'fee',
        loadChildren: './school-admin-master-entry-fee/school-admin-master-entry-fee.module#SchoolAdminMasterEntryFeeModule'
      },
      {
        path: 'late',
        loadChildren: './school-admin-master-entry-late-fees/' +
        'school-admin-master-entry-late-fees.module#SchoolAdminMasterEntryLateFeesModule'
      },
      {
        path: 'class',
        loadChildren: './school-admin-master-entry-class/school-admin-master-entry-class.module#SchoolAdminMasterEntryClassModule'
      },
      {
        path: 'subject',
        loadChildren: './school-admin-master-entry-subject/school-admin-master-entry-subject.module#SchoolAdminMasterEntrySubjectModule'
      },
      {
        path: 'period',
        loadChildren: './school-admin-master-entry-period/school-admin-master-entry-period.module#SchoolAdminMasterEntryPeriodModule'
      },
      {
        path: 'lateFee',
        loadChildren: './school-admin-master-entry-late-fees/school-admin-master-entry-late-fees.module#SchoolAdminMasterEntryLateFeesModule'
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
    TeacherService,
    ClassService,
    SubjectService,
    TimeTableService
  ],
  declarations: [SchoolAdminMasterEntryComponent]
})
export class SchoolAdminMasterEntryModule {
}
