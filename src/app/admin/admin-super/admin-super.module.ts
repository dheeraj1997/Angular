import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {Routes, RouterModule} from '@angular/router';
import {AdminSuperComponent} from './admin-super.component';
import {FormsModule} from '@angular/forms';

const routes: Routes = [
  {
    path: '',
    component: AdminSuperComponent,
    children: [
      {
        path: '',
        loadChildren: './admin-super-dashboard/admin-super-dashboard.module#AdminSuperDashboardModule'
      },
      {
        path: 'school',
        loadChildren: './admin-super-school/admin-super-school.module#AdminSuperSchoolModule'
      },
      {
        path: 'employee',
        loadChildren: './admin-super-employee/admin-super-employee.module#AdminSuperEmployeeModule'
      },
      {
        path: 'organization',
        loadChildren: './admin-super-organization/admin-super-organization.module#AdminSuperOrganizationModule'
      },
      {
        path: '**',
        redirectTo: ''
      }
    ]
  }
];


@NgModule({
  imports: [
    CommonModule,
    RouterModule.forChild(routes)
  ],
  declarations: [AdminSuperComponent]
})
export class AdminSuperModule {
}
