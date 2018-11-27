import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {HomeComponent} from './home.component';
import {Routes, RouterModule} from '@angular/router';

const route: Routes = [{
  path: '',
  component: HomeComponent
}];

@NgModule({
  imports: [
    CommonModule,
    RouterModule.forChild(route)
  ],
  declarations: [HomeComponent]
})
export class HomeModule {
}
