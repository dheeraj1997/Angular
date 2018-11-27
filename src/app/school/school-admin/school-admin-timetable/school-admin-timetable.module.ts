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
import {SessionService} from '../../../shared/services/session.service';
import {NumSufPipe} from '../../../shared/pipes/num-suf.pipe';
import {CapitalizePipe} from '../../../shared/pipes/capitalize.pipe';
import {AmpmPipe} from '../../../shared/pipes/ampm.pipe';
import {SchoolAdminTimetableComponent} from './school-admin-timetable.component';
import { SchoolAdminTimetableCreateComponent } from './school-admin-timetable-create/school-admin-timetable-create.component';
import { SchoolAdminTimetableViewComponent } from './school-admin-timetable-view/school-admin-timetable-view.component';

const routes: Routes = [
  {
    path: '',
    component: SchoolAdminTimetableComponent,
    children: [
      {
        path: 'create',
        component: SchoolAdminTimetableCreateComponent,
        data: {
          heading: 'Create Timetable'
        }
      },
      {
        path: 'view',
        component: SchoolAdminTimetableViewComponent, data: {
        heading: 'View Timetable'
      }
      },
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
    SessionService,
    TimeTableService
  ],
  declarations: [
    NumSufPipe,
    CapitalizePipe,
    AmpmPipe,
    SchoolAdminTimetableComponent,
    SchoolAdminTimetableCreateComponent,
    SchoolAdminTimetableViewComponent
  ]
})
export class SchoolAdminTimetableModule {
}
