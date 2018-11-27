import {NgModule} from '@angular/core';
import {RouterModule} from '@angular/router';
import {CommonModule} from '@angular/common';
import {GoogleAnalyticsEventsService} from '../../../shared/services/google-analytics-events.service';

import {NgxChartsModule} from '@swimlane/ngx-charts';

import {AdminSuperDashboardComponent} from './admin-super-dashboard.component';
import {AdminSuperDashboardRoutes} from './admin-super-dashboard.routing';

@NgModule({
  imports: [CommonModule, RouterModule.forChild(AdminSuperDashboardRoutes), NgxChartsModule],
  declarations: [AdminSuperDashboardComponent],
  providers: [GoogleAnalyticsEventsService]
})

export class AdminSuperDashboardModule {
}
