import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {RouterModule} from '@angular/router';
import {AdminOrganizationDashboardRoutes} from './admin-organization-dashboard.routing';
import {AdminOrganizationDashboardComponent} from './admin-organization-dashboard.component';

@NgModule({
  imports: [
    CommonModule,
    RouterModule.forChild(AdminOrganizationDashboardRoutes)
  ],
  declarations: [AdminOrganizationDashboardComponent]
})
export class AdminOrganizationDashboardModule {
}
