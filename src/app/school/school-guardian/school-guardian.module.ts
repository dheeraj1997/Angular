import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {Routes, RouterModule} from '@angular/router';
import {SchoolGuardianComponent} from './school-guardian.component';

const routes: Routes = [
  {
    path: '',
    component: SchoolGuardianComponent,
    children: [
      {
        path: 'dashboard',
        loadChildren: './school-guardian-dashboard/school-guardian-dashboard.module#SchoolGuardianDashboardModule'
      }, {
        path: 'library',
        loadChildren: './school-guardian-library/school-guardian-library.module#SchoolGuardianLibraryModule'
      },
      {
        path: 'notice',
        loadChildren: './school-guardian-notice/school-guardian-notice.module#SchoolGuardianNoticeModule'
      },
      {
        path: 'examination',
        loadChildren: './school-guardian-examination/school-guardian-examination.module#SchoolGuardianExaminationModule'
      },
      {
        path: 'calendar',
        loadChildren: './school-guardian-event-calendar/school-guardian-event-calendar.module#SchoolGuardianEventCalendarModule'
      },
      {
        path: 'report',
        loadChildren: './school-guardian-reports/school-guardian-reports.module#SchoolGuardianReportsModule'
      },
      {
        path: 'settings',
        loadChildren: './school-guardian-settings/school-guardian-settings.module#SchoolGuardianSettingsModule'
      },
      {
        path: 'timetable',
        loadChildren: './school-guardian-timetable/school-guardian-timetable.module#SchoolGuardianTimetableModule'
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
  declarations: [SchoolGuardianComponent]
})
export class SchoolGuardianModule {
}
