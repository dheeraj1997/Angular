import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {Routes, RouterModule} from '@angular/router';
import {SchoolLibrarianComponent} from './school-librarian.component';

const routes: Routes = [
  {
    path: '',
    component: SchoolLibrarianComponent,
    children: [
      {
        path: 'dashboard',
        loadChildren: './school-librarian-dashboard/school-librarian-dashboard.module#SchoolLibrarianDashboardModule'
      },
      {
        path: 'books',
        loadChildren: './school-librarian-books/school-librarian-books.module#SchoolLibrarianBooksModule'
      },
      {
        path: 'calendar',
        loadChildren: './school-librarian-event-calendar/school-librarian-event-calendar.module#SchoolLibrarianEventCalendarModule'
      },
      {
        path: 'manage',
        loadChildren: './school-librarian-manage/school-librarian-manage.module#SchoolLibrarianManageModule'
      },
      {
        path: 'notice',
        loadChildren: './school-librarian-notice/school-librarian-notice.module#SchoolLibrarianNoticeModule'
      },
      {
        path: 'event-calendar',
        loadChildren: './school-librarian-event-calendar/school-librarian-event-calendar.module#SchoolLibrarianEventCalendarModule'
      },
      {
        path: 'drive',
        loadChildren: './school-librarian-drive/school-librarian-drive.module#SchoolLibrarianDriveModule'
      },
      {
        path: 'report',
        loadChildren: './school-librarian-report/school-librarian-report.module#SchoolLibrarianReportModule'
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
  declarations: [SchoolLibrarianComponent]
})

export class SchoolLibrarianModule {
}
