import {Routes} from '@angular/router';

import {SchoolAdminDashboardComponent} from './school-admin-dashboard.component';

export const SchoolAdminDashboardRoutes: Routes = [{
  path: '',
  component: SchoolAdminDashboardComponent,
  data: {
    heading: 'Dashboard'
  }
}];
