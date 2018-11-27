import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {Routes, RouterModule} from '@angular/router';
import {ConnectComponent} from './connect.component';

const route: Routes = [{
  path: '',
  component: ConnectComponent
}];

@NgModule({
  imports: [
    CommonModule,
    RouterModule.forChild(route)
  ],
  declarations: [ConnectComponent]
})
export class ConnectModule {
}
