import {NgModule} from '@angular/core';
import {RouterModule} from '@angular/router';
import {CommonModule} from '@angular/common';
import {GoogleAnalyticsEventsService} from '../../../shared/services/google-analytics-events.service';
import {NgxChartsModule} from '@swimlane/ngx-charts';

import { AdminEmployeeDashboardComponent } from './admin-employee-dashboard.component';
import {AdminEmployeeDashboardRoutes} from './admin-employee-dashboard.routing';

@NgModule({
	imports: [CommonModule, RouterModule.forChild(AdminEmployeeDashboardRoutes), NgxChartsModule],
	declarations: [AdminEmployeeDashboardComponent],
	providers: [GoogleAnalyticsEventsService]
})
export class AdminEmployeeDashboardModule { }
