import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {Routes, RouterModule} from '@angular/router';
import {NgbModule} from '@ng-bootstrap/ng-bootstrap';
import {FormsModule} from '@angular/forms';
import {GoogleAnalyticsEventsService} from '../../../shared/services/google-analytics-events.service';
import {AddressService} from '../../../shared/services/address.service';
import {OrganizationService} from '../../../shared/services/organization.service';
import {UserService} from '../../../shared/services/user.service';
import { AdminSuperOrganizationComponent } from './admin-super-organization.component';
import { AdminSuperOrganizationAddComponent } from './admin-super-organization-add/admin-super-organization-add.component';
import { AdminSuperOrganizationViewComponent } from './admin-super-organization-view/admin-super-organization-view.component';
import { AdminSuperOrganizationEditComponent } from './admin-super-organization-edit/admin-super-organization-edit.component';

const routes: Routes = [
  {
    path: '',
    component: AdminSuperOrganizationComponent,
    children: [
      {
        path: 'add',
        component: AdminSuperOrganizationAddComponent,
        data: {
          heading: 'Add Organization'
        }
      },
      {
        path: 'view',
        component: AdminSuperOrganizationViewComponent,
        data: {
          heading: 'View Organization'
        }
      },
      {
        path: 'edit/:organizationId',
        component: AdminSuperOrganizationEditComponent,
        data: {
          heading: 'Edit Organization'
        }
      }
    ]
  }
];


@NgModule({
  imports: [
    CommonModule,
    RouterModule.forChild(routes),
    FormsModule,
    NgbModule
  ],
  providers: [
    AddressService,
    OrganizationService,
    UserService,
    GoogleAnalyticsEventsService
  ],
  declarations: [AdminSuperOrganizationComponent, AdminSuperOrganizationAddComponent, AdminSuperOrganizationViewComponent, AdminSuperOrganizationEditComponent]
})
export class AdminSuperOrganizationModule { }
