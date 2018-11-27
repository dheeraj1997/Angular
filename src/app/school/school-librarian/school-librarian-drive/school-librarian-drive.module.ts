
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';

import { SchoolLibrarianDriveComponent } from './school-librarian-drive.component';
import { SchoolLibrarianDriveAddComponent } from './school-librarian-drive-add/school-librarian-drive-add.component';
import { SchoolLibrarianDriveViewComponent } from './school-librarian-drive-view/school-librarian-drive-view.component';
import { SchoolLibrarianDriveViewFolderComponent } from './school-librarian-drive-view-folder/school-librarian-drive-view-folder.component';
import { Routes, RouterModule } from '@angular/router';
import { SchoolLibrarianDriveViewSharedComponent } from './school-librarian-drive-view/school-librarian-drive-view-shared/school-librarian-drive-view-shared.component';
import { SchoolLibrarianDriveViewMainComponent } from './school-librarian-drive-view/school-librarian-drive-view-main/school-librarian-drive-view-main.component';
import { SchoolLibrarianDriveViewMyFilesComponent } from './school-librarian-drive-view/school-librarian-drive-view-my-files/school-librarian-drive-view-my-files.component';


			
const routes: Routes = [{
	path: '',
	component: SchoolLibrarianDriveComponent,
	children: [{
		path: 'add',
		component: SchoolLibrarianDriveAddComponent,
		data: {
			heading: 'Add Drive'

		},
	}, {
		path: 'view',
				component: SchoolLibrarianDriveViewComponent,

					data: {
				heading: 'View Drive'

			},
		},
			{
			path: 'folder',
			component: SchoolLibrarianDriveViewFolderComponent,
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
  declarations: [SchoolLibrarianDriveComponent,
               SchoolLibrarianDriveAddComponent,
               SchoolLibrarianDriveViewComponent,
               SchoolLibrarianDriveViewFolderComponent,
               SchoolLibrarianDriveViewSharedComponent,
               SchoolLibrarianDriveViewMainComponent,
               SchoolLibrarianDriveViewMyFilesComponent]
})
export class SchoolLibrarianDriveModule { }
