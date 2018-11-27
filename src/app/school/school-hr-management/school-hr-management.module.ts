import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Routes, RouterModule } from '@angular/router';
import { SchoolHrManagementComponent } from './school-hr-management.component';

const routes: Routes = [
	{
		path: '',
		component: SchoolHrManagementComponent,
		children: [

			{
				path: 'dashboard',
				loadChildren: './school-hr-management-dashboard/school-hr-management-dashboard.module#SchoolHrManagementDashboardModule'
			},
			{
				path: 'attendance',
				loadChildren: './school-hr-management-attendance/school-hr-management-attendance.module#SchoolHrManagementAttendanceModule'
			},
			{
				path: 'messaging',
				loadChildren: './school-hr-management-messaging/school-hr-management-messaging.module#SchoolHrManagementMessagingModule'
			},
			{
				path: 'notice',
				loadChildren: './school-hr-management-notice/school-hr-management-notice.module#SchoolHrManagementNoticeModule'
			},
			{
				path: 'calendar',
				loadChildren: './school-hr-management-event-calendar/school-hr-management-event-calendar.module#SchoolHrManagementEventCalendarModule'
			},
			{
				path: 'drive',
				loadChildren: './school-hr-management-drive/school-hr-management-drive.module#SchoolHrManagementDriveModule'
			},
			{
				path: 'report',
				loadChildren: './school-hr-management-report/school-hr-management-report.module#SchoolHrManagementReportModule'
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
	declarations: [SchoolHrManagementComponent]
})
export class SchoolHrManagementModule {

}
