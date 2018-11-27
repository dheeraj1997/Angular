
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { SchoolAccountantDriveComponent } from './school-accountant-drive.component';
import { SchoolAccountantDriveAddComponent } from './school-accountant-drive-add/school-accountant-drive-add.component';
import { SchoolAccountantDriveViewComponent } from './school-accountant-drive-view/school-accountant-drive-view.component';
import { Routes, RouterModule } from '@angular/router';
import { SchoolAccountantDriveViewMainComponent } from './school-accountant-drive-view/school-accountant-drive-view-main/school-accountant-drive-view-main.component';
import { SchoolAccountantDriveViewMyFilesComponent } from './school-accountant-drive-view/school-accountant-drive-view-my-files/school-accountant-drive-view-my-files.component';
import { SchoolAccountantDriveViewSharedComponent } from './school-accountant-drive-view/school-accountant-drive-view-shared/school-accountant-drive-view-shared.component';
import { SchoolAccountantDriveFolderComponent } from './school-accountant-drive-folder/school-accountant-drive-folder.component'

const routes: Routes = [{
	path: '',
	component: SchoolAccountantDriveComponent,
	children: [{
		path: 'add',
		component: SchoolAccountantDriveAddComponent,
		data: {
			heading: 'Add Drive'

		},
	}, {
		path: 'view',
			component: SchoolAccountantDriveViewComponent,
		data: {
			heading: 'View Drive'

		},
	},

			{
			path: 'folder',
			component: SchoolAccountantDriveFolderComponent,
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
  declarations: [SchoolAccountantDriveComponent,
	  SchoolAccountantDriveAddComponent,
	  SchoolAccountantDriveViewComponent,
	  SchoolAccountantDriveViewMainComponent,
	  SchoolAccountantDriveViewMyFilesComponent,
	  SchoolAccountantDriveViewSharedComponent,
	  SchoolAccountantDriveFolderComponent]
})
export class SchoolAccountantDriveModule { }
