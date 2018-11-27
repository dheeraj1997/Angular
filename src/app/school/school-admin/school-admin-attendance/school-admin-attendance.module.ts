import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {Routes, RouterModule} from '@angular/router';
import {MomentModule} from 'angular2-moment';
import {NgbModule} from '@ng-bootstrap/ng-bootstrap';
import {FormsModule} from '@angular/forms';
import {SchoolService} from '../../../shared/services/school.service';
import {GSettingsService} from '../../../shared/services/g-settings.service';
import {StudentService} from '../../../shared/services/student.service';
import {SchoolAdminAttendanceComponent} from './school-admin-attendance.component';
import {SchoolAdminAttendanceViewComponent} from './school-admin-attendance-view/school-admin-attendance-view.component';
import {SchoolAdminAttendanceListComponent} from './school-admin-attendance-list/school-admin-attendance-list.component';
import {SchoolAdminAttendanceTakeComponent} from './school-admin-attendance-take/school-admin-attendance-take.component';
import { SchoolAdminAttendanceDisplayComponent } from './school-admin-attendance-display/school-admin-attendance-display.component';

const routes: Routes = [
  {
    path: '',
    component: SchoolAdminAttendanceComponent,
    children: [
      {
        path: 'view/:listId',
        component: SchoolAdminAttendanceViewComponent,
        data: {
          heading: 'View Attendance'
        }
      },
      {
        path: 'take/:listId',
        component: SchoolAdminAttendanceTakeComponent,
        data: {
          heading: 'Take Attendance'
        }
      },
      {
        path: 'list',
        component: SchoolAdminAttendanceListComponent,
        data: {
          heading: 'List Attendance'
        }
      },
      {
        path: 'display',
        component: SchoolAdminAttendanceDisplayComponent,
        data: {
          heading: 'Show Attendance'
        }
      }
    ]
  }
];

@NgModule({
  imports: [
    CommonModule,
    MomentModule,
    NgbModule,
    FormsModule,
    RouterModule.forChild(routes)
  ],
  declarations: [
    SchoolAdminAttendanceComponent,
    SchoolAdminAttendanceViewComponent,
    SchoolAdminAttendanceListComponent,
    SchoolAdminAttendanceTakeComponent,
    SchoolAdminAttendanceDisplayComponent
  ],
  providers: [SchoolService, GSettingsService, StudentService]
})
export class SchoolAdminAttendanceModule {
}
