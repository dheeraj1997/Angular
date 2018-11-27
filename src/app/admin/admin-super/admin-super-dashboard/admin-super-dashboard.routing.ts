import {Routes} from '@angular/router';

import {AdminSuperDashboardComponent} from './admin-super-dashboard.component';

export const AdminSuperDashboardRoutes: Routes = [{
  path: '',
  component: AdminSuperDashboardComponent,
  data: {
    heading: 'Dashboard'
  }
}];
