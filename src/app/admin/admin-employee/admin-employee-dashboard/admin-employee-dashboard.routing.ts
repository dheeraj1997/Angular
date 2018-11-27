import {Routes} from '@angular/router';

import {AdminEmployeeDashboardComponent} from './admin-employee-dashboard.component';

export const AdminEmployeeDashboardRoutes: Routes = [{
 
  path: '',
  component: AdminEmployeeDashboardComponent,
  data: {
    heading: 'Dashboard'
  }
}];