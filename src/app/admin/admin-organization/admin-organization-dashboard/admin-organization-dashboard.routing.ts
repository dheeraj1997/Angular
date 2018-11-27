import {Routes} from '@angular/router';

import {AdminOrganizationDashboardComponent} from './admin-organization-dashboard.component';

export const AdminOrganizationDashboardRoutes: Routes = [{

  path: '',
  component: AdminOrganizationDashboardComponent,
  data: {
    heading: 'Dashboard'
  }
}];
