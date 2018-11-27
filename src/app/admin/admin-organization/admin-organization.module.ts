import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {Routes, RouterModule} from '@angular/router';
import {FormsModule} from '@angular/forms';
import {AdminOrganizationComponent} from './admin-organization.component';

const routes: Routes = [
  {
    path: '',
    component: AdminOrganizationComponent,
    children: [
      {
        path: 'dashboard',
        loadChildren: './admin-organization-dashboard/admin-organization-dashboard.module#AdminOrganizationDashboardModule'
      },
      {
        path: 'school',
        loadChildren: './admin-organization-school/admin-organization-school.module#AdminOrganizationSchoolModule'
      },
      {
        path: '**',
        redirectTo: 'dashboard'
      },
      {
        path: '',
        redirectTo: 'dashboard'
      }
    ]
  }
];

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    RouterModule.forChild(routes)
  ],
  declarations: [AdminOrganizationComponent]
})
export class AdminOrganizationModule {
}
