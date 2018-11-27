import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {Routes, RouterModule} from '@angular/router';
import {NgbModule} from '@ng-bootstrap/ng-bootstrap';
import {FormsModule} from '@angular/forms';
import {AgmCoreModule} from '@agm/core';
import {MomentModule} from 'angular2-moment';

import {AddressService} from '../../../shared/services/address.service';
import {SchoolService} from '../../../shared/services/school.service';
import {UserService} from '../../../shared/services/user.service';
import { OrganizationService } from '../../../shared/services/organization.service';

import { AdminOrganizationSchoolComponent } from './admin-organization-school.component';
import { AdminOrganizationSchoolAddComponent } from './admin-organization-school-add/admin-organization-school-add.component';
import { AdminOrganizationSchoolViewComponent } from './admin-organization-school-view/admin-organization-school-view.component';
import { AdminOrganizationSchoolEditComponent } from './admin-organization-school-edit/admin-organization-school-edit.component';

const routes: Routes = [
{
	path: '',
	component: AdminOrganizationSchoolComponent,
	children: [
	{
		path: 'add',
		component: AdminOrganizationSchoolAddComponent
	},
	{
		path: 'view',
		component: AdminOrganizationSchoolViewComponent
	},
	{
		path: 'edit/:schoolId',
		component: AdminOrganizationSchoolEditComponent
	}
	]
}
];
@NgModule({
	imports: [
	CommonModule,
	FormsModule,
	AgmCoreModule.forRoot({
		apiKey: 'AIzaSyDm0RFD5xqng-8OdpBwXMy4j0BxCJwf-B0'
	}),
	MomentModule,
	NgbModule,
	RouterModule.forChild(routes)
	],
	providers: [
	AddressService,
	SchoolService,
	OrganizationService
	],
	declarations: [AdminOrganizationSchoolComponent, AdminOrganizationSchoolAddComponent, AdminOrganizationSchoolViewComponent, AdminOrganizationSchoolEditComponent]
})
export class AdminOrganizationSchoolModule { }
