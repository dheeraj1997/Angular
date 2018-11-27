import {Routes} from '@angular/router';

import {SchoolTeacherDashboardComponent} from './school-teacher-dashboard.component';

export const SchoolTeacherDashboardRoutes: Routes = [{
  path: '',
  component: SchoolTeacherDashboardComponent,
  data: {
    heading: 'Dashboard'
  }
}];
