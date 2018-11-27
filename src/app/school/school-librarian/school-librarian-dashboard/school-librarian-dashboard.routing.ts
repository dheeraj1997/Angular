import {Routes} from '@angular/router';

import {SchoolLibrarianDashboardComponent} from './school-librarian-dashboard.component';

export const SchoolLibrarianDashboardRoutes: Routes = [{
  
 	 path: '',
  component: SchoolLibrarianDashboardComponent,
  data: {
    heading: 'Dashboard'
  }
}];