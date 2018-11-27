import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {Routes, RouterModule} from '@angular/router';
import { SchoolRegistrarComponent } from './school-registrar.component';


const routes: Routes = [
{
	path: '',
	component: SchoolRegistrarComponent,
	children: [
	{
		path: 'dashboard',
		loadChildren: './school-registrar-dashboard/school-registrar-dashboard.module#SchoolRegistrarDashboardModule'
	},
	{
		path: 'calendar',
		loadChildren: './school-registrar-event-calendar/school-registrar-event-calendar.module#SchoolRegistrarEventCalendarModule'
	},
	{
		path: 'notice',
		loadChildren: './school-registrar-notice/school-registrar-notice.module#SchoolRegistrarNoticeModule'
	},
	{
		path: 'report',
		loadChildren: './school-registrar-report/school-registrar-report.module#SchoolRegistrarReportModule'
	},
	{
		path: 'student',
		loadChildren: './school-registrar-student/school-registrar-student.module#SchoolRegistrarStudentModule'
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
	declarations: [SchoolRegistrarComponent]
})

export class SchoolRegistrarModule {
}