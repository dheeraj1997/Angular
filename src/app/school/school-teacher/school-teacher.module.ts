import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {Routes, RouterModule} from '@angular/router';

import {SchoolTeacherComponent} from './school-teacher.component';

const routes: Routes = [
  {
    path: '',
    component: SchoolTeacherComponent,
    children: [
      {
        path: 'dashboard',
        loadChildren: './school-teacher-dashboard/school-teacher-dashboard.module#SchoolTeacherDashboardModule'
      },
      {
        path: 'time-table',
        loadChildren: './school-teacher-time-table/school-teacher-time-table.module#SchoolTeacherTimeTableModule'
      },
      {
        path: 'calendar',
        loadChildren: './school-teacher-event-calendar/school-teacher-event-calendar.module#SchoolTeacherEventCalendarModule'
      },
      {
        path: 'report',
        loadChildren: './school-teacher-report/school-teacher-report.module#SchoolTeacherReportModule'
      },
      {
        path: 'attendance',
        loadChildren: './school-teacher-attendance/school-teacher-attendance.module#SchoolTeacherAttendanceModule'
      },
      {
        path: 'homework',
        loadChildren: './school-teacher-homework/school-teacher-homework.module#SchoolTeacherHomeworkModule'
      },
      {
        path: 'result',
        loadChildren: './school-teacher-result/school-teacher-result.module#SchoolTeacherResultModule'
      },
      {
        path: 'drive',
        loadChildren: './school-teacher-drive/school-teacher-drive.module#SchoolTeacherDriveModule'
      },
      {
        path: 'notice',
        loadChildren: './school-teacher-notice/school-teacher-notice.module#SchoolTeacherNoticeModule'
      },
      {
        path: 'admit-card',
        loadChildren: './school-teacher-admit-card/school-teacher-admit-card.module#SchoolTeacherAdmitCardModule'
      },
      {
        path: '',
        redirectTo: 'dashboard'
      },
      {
        path: '**',
        redirectTo: 'dashboard'
      }
    ]
  }
];

@NgModule({
  imports: [
    CommonModule,
    RouterModule.forChild(routes)
  ],
  declarations: [SchoolTeacherComponent]
})
export class SchoolTeacherModule {
}
