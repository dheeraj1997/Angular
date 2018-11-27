
import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';

import {SchoolTeacherDriveComponent} from './school-teacher-drive.component';
import {SchoolTeacherDriveAddComponent} from './school-teacher-drive-add/school-teacher-drive-add.component';
import {SchoolTeacherDriveViewComponent} from './school-teacher-drive-view/school-teacher-drive-view.component';
import {Routes, RouterModule} from '@angular/router';
import { SchoolTeacherDriveViewFolderComponent } from './school-teacher-drive-view-folder/school-teacher-drive-view-folder.component';
import { SchoolTeacherDriveViewMainComponent } from './school-teacher-drive-view/school-teacher-drive-view-main/school-teacher-drive-view-main.component';
import { SchoolTeacherDriveViewMyFilesComponent } from './school-teacher-drive-view/school-teacher-drive-view-my-files/school-teacher-drive-view-my-files.component';
import { SchoolTeacherDriveViewSharedComponent } from './school-teacher-drive-view/school-teacher-drive-view-shared/school-teacher-drive-view-shared.component'

const routes: Routes = [{
  path: '',
  component: SchoolTeacherDriveComponent,
  children: [{
    path: 'add',
    component: SchoolTeacherDriveAddComponent,
    data: {
      heading: 'Add Drive'

    }
  }, {
    path: 'view',
    component: SchoolTeacherDriveViewComponent,
      data: {
        heading: 'View Drive'

      }
  }]
}];

@NgModule({
  imports: [
    CommonModule,
    NgbModule,
    RouterModule.forChild(routes)
  ],
  declarations: [SchoolTeacherDriveComponent, 
  SchoolTeacherDriveAddComponent, 
  SchoolTeacherDriveViewComponent, SchoolTeacherDriveViewFolderComponent, SchoolTeacherDriveViewMainComponent, SchoolTeacherDriveViewMyFilesComponent, SchoolTeacherDriveViewSharedComponent]
})
export class SchoolTeacherDriveModule {
}
