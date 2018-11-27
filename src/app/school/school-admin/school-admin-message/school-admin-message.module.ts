import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {Routes, RouterModule} from '@angular/router';
import {MomentModule} from 'angular2-moment';
import {NgbModule} from '@ng-bootstrap/ng-bootstrap';
import {FormsModule} from '@angular/forms';

import {SchoolService} from '../../../shared/services/school.service';
import {ClassService} from '../../../shared/services/class.service';
import {StudentService} from '../../../shared/services/student.service';
import {TeacherService} from '../../../shared/services/teacher.service';
import {StaffService} from '../../../shared/services/staff.service';
import {SchoolAdminMessageComponent} from './school-admin-message.component';
import {SchoolAdminMessageSendComponent} from './school-admin-message-send/school-admin-message-send.component';
import {SchoolAdminMessageHistoryComponent} from './school-admin-message-history/school-admin-message-history.component';


const routes: Routes = [
  {
    path: '',
    component: SchoolAdminMessageComponent,
    children: [
      {
        path: 'send',
        component: SchoolAdminMessageSendComponent,
        data: {
          heading: 'Send Message'
        }
      },
      {
        path: 'history',
        component: SchoolAdminMessageHistoryComponent,
        data: {
          heading: 'Message History'
        }
      }
    ]
  }
];

@NgModule({
  imports: [
    CommonModule,
    NgbModule,
    MomentModule,
    FormsModule,
    RouterModule.forChild(routes)
  ],
  providers: [
    SchoolService,
    ClassService,
    StudentService,
    TeacherService,
    StaffService
  ],
  declarations: [SchoolAdminMessageComponent, SchoolAdminMessageSendComponent, SchoolAdminMessageHistoryComponent]
})
export class SchoolAdminMessageModule {
}
