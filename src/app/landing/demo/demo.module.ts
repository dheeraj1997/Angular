import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {DemoComponent} from './demo.component';
import {Routes, RouterModule} from '@angular/router';

const route: Routes = [{
  path: '',
  component: DemoComponent
}];

@NgModule({
  imports: [
    CommonModule,
    RouterModule.forChild(route)
  ],
  declarations: [DemoComponent]
})
export class DemoModule {
}
