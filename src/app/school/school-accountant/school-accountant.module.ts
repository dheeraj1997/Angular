import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {Routes, RouterModule} from '@angular/router';
import {SchoolAccountantComponent} from './school-accountant.component';


const routes: Routes = [
  {
    path: '',
    component: SchoolAccountantComponent,
    children: [
      {
        path: 'dashboard',
        loadChildren: './school-accountant-dashboard/school-accountant-dashboard.module#SchoolAccountantDashboardModule'
      },
      {
        path: 'fees',
        loadChildren: './school-accountant-fees/school-accountant-fees.module#SchoolAccountantFeesModule'
      },
      {
        path: 'expenses',
        loadChildren: './school-accountant-expenses/school-accountant-expenses.module#SchoolAccountantExpensesModule'
      },
      {
        path: 'ledger',
        loadChildren: './school-accountant-ledger/school-accountant-ledger.module#SchoolAccountantLedgerModule'
      },
      {
        path: 'notice',
        loadChildren: './school-accountant-notice/school-accountant-notice.module#SchoolAccountantNoticeModule'
      },
    {
      path: 'calendar',
    loadChildren: './school-accountant-event-calendar/school-accountant-event-calendar.module#SchoolAccountantEventCalendarModule'
    },
    {
      path: 'drive',
    loadChildren: './school-accountant-drive/school-accountant-drive.module#SchoolAccountantDriveModule'
    },
    {
      path: 'report',
    loadChildren: './school-accountant-report/school-accountant-report.module#SchoolAccountantReportModule'
    },
    {
      path: 'transport',
    loadChildren: './school-accountant-transport/school-accountant-transport.module#SchoolAccountantTransportModule'
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
  declarations: [SchoolAccountantComponent]
})
export class SchoolAccountantModule {
}
