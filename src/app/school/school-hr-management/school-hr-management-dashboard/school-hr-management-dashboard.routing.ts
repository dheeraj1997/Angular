import { Routes } from '@angular/router';

import { SchoolHrManagementDashboardComponent } from './school-hr-management-dashboard.component';

export const SchoolHrManagementDashboardRoutes: Routes = [{
	path: '',
	component: SchoolHrManagementDashboardComponent,
	data: {
		heading: 'Dashboard'
	}
}];
