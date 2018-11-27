import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {Routes, RouterModule} from '@angular/router';
import {SchoolAdminComponent} from './school-admin.component';

const routes: Routes = [
  {
    path: '',
    component: SchoolAdminComponent,
    children: [
      {
        path: 'dashboard',
        loadChildren: './school-admin-dashboard/school-admin-dashboard.module#SchoolAdminDashboardModule'
      },
      {
        path: 'attendance',
        loadChildren: './school-admin-attendance/school-admin-attendance.module#SchoolAdminAttendanceModule'
      },
      {
        path: 'message',
        loadChildren: './school-admin-message/school-admin-message.module#SchoolAdminMessageModule'
      },
      {
        path: 'notice',
        loadChildren: './school-admin-notice/school-admin-notice.module#SchoolAdminNoticeModule'
      },
      {
        path: 'examination',
        loadChildren: './school-admin-examination/school-admin-examination.module#SchoolAdminExaminationModule'
      },
      {
        path: 'calendar',
        loadChildren: './school-admin-event-calendar/school-admin-event-calendar.module#SchoolAdminEventCalendarModule'
      },
      {
        path: 'report',
        loadChildren: './school-admin-reports/school-admin-reports.module#SchoolAdminReportsModule'
      },
      {
        path: 'master',
        loadChildren: './school-admin-master/school-admin-master-entry.module#SchoolAdminMasterEntryModule'
      },
      {
        path: 'student',
        loadChildren: './school-admin-student/school-admin-student.module#SchoolAdminStudentModule'
      },
      {
        path: 'teacher',
        loadChildren: './school-admin-teacher/school-admin-teacher.module#SchoolAdminTeacherModule'
      },
      {
        path: 'staff',
        loadChildren: './school-admin-staff/school-admin-staff.module#SchoolAdminStaffModule'
      },
      {
        path: 'settings',
        loadChildren: './school-admin-settings/school-admin-settings.module#SchoolAdminSettingsModule'
      },
      {
        path: 'timetable',
        loadChildren: './school-admin-timetable/school-admin-timetable.module#SchoolAdminTimetableModule'
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
  declarations: [SchoolAdminComponent]
})
export class SchoolAdminModule {
}
