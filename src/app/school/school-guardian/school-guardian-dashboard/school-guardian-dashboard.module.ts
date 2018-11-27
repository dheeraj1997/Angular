import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {Routes, RouterModule} from '@angular/router';
import {SchoolGuardianDashboardComponent} from './school-guardian-dashboard.component';

const routes: Routes = [{
  path: '',
  component: SchoolGuardianDashboardComponent,
  data: {
    heading: 'Dashboard'
  }
}];

@NgModule({
  imports: [
    CommonModule,
    RouterModule.forChild(routes)
  ],
  declarations: [SchoolGuardianDashboardComponent]
})
export class SchoolGuardianDashboardModule {
}
