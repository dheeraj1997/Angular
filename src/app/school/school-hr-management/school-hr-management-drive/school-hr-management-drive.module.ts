
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { SchoolHrManagementDriveComponent } from './school-hr-management-drive.component';
import { SchoolHrManagementDriveViewMainComponent } from './school-hr-management-drive-view/school-hr-management-drive-view-main/school-hr-management-drive-view-main.component';
import { SchoolHrManagementDriveViewMyFilesComponent } from './school-hr-management-drive-view/school-hr-management-drive-view-my-files/school-hr-management-drive-view-my-files.component';
import { SchoolHrManagementDriveViewSharedComponent } from './school-hr-management-drive-view/school-hr-management-drive-view-shared/school-hr-management-drive-view-shared.component';
import { SchoolHrManagementDriveAddComponent } from './school-hr-management-drive-add/school-hr-management-drive-add.component';
import { SchoolHrManagementDriveViewComponent } from './school-hr-management-drive-view/school-hr-management-drive-view.component';
import { Routes, RouterModule } from '@angular/router';
import { SchoolHrManagementDriveViewFolderComponent } from './school-hr-management-drive-view-folder/school-hr-management-drive-view-folder.component';

const routes: Routes = [{
	path: '',
	component: SchoolHrManagementDriveComponent,
	children: [{
		path: 'add',
		component: SchoolHrManagementDriveAddComponent,
		data: {
			heading: 'Add Drive'

		},
	}, {
		path: 'view',
			component: SchoolHrManagementDriveViewComponent,
			data: {
				heading: 'View Drive'

			},
		},
			{
			path: 'folder',
			component: SchoolHrManagementDriveViewFolderComponent,
			data: {
				heading: 'View folder'

			},			
	}],
}];

@NgModule({
  imports: [
    CommonModule,
	  NgbModule,
	RouterModule.forChild(routes),
  ],
  declarations: [SchoolHrManagementDriveComponent,
  SchoolHrManagementDriveViewMainComponent, 
  SchoolHrManagementDriveViewMyFilesComponent,
  SchoolHrManagementDriveAddComponent, 
  SchoolHrManagementDriveViewSharedComponent,
  SchoolHrManagementDriveViewComponent,
  SchoolHrManagementDriveViewFolderComponent]
})
export class SchoolHrManagementDriveModule { }
