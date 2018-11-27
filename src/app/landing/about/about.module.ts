import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {AboutComponent} from './about.component';
import {Routes, RouterModule} from '@angular/router';

const route: Routes = [{
  path: '',
  component: AboutComponent
}];

@NgModule({
  imports: [
    CommonModule,
    RouterModule.forChild(route)
  ],
  declarations: [AboutComponent]
})
export class AboutModule {
}
