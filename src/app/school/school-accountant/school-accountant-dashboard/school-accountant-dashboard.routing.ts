import {Routes} from '@angular/router';

import {SchoolAccountantDashboardComponent} from './school-accountant-dashboard.component';

export const SchoolAccountantDashboardRoutes: Routes = [{
  path: '',
  component: SchoolAccountantDashboardComponent,
  data: {
    heading: 'Accountant Dashboard'
  }
}];
