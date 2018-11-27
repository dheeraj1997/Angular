import {Routes} from '@angular/router';

import {SchoolRegistrarDashboardComponent} from './school-registrar-dashboard.component';

export const SchoolRegistrarDashboardRoutes: Routes = [{
  
 	 path: '',
  component: SchoolRegistrarDashboardComponent,
  data: {
    heading: 'Dashboard'
  }
}];