import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {Routes, RouterModule} from '@angular/router';
import {FormsModule} from '@angular/forms';
import {AdminEmployeeComponent} from './admin-employee.component';

const routes: Routes = [
  {
    path: '',
    component: AdminEmployeeComponent,
    children: [
      {
        path: 'dashboard',
        loadChildren: './admin-employee-dashboard/admin-employee-dashboard.module#AdminEmployeeDashboardModule'
      },
      {
        path: 'school',
        loadChildren: './admin-employee-school/admin-employee-school.module#AdminEmployeeSchoolModule'
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
    RouterModule.forChild(routes)
  ],
  declarations: [AdminEmployeeComponent]
})
export class AdminEmployeeModule {
}
