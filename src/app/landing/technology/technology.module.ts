import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {Routes, RouterModule} from '@angular/router';
import {TechnologyComponent} from './technology.component';

const route: Routes = [{
  path: '',
  component: TechnologyComponent
}];

@NgModule({
  imports: [
    CommonModule,
    RouterModule.forChild(route)
  ],
  declarations: [TechnologyComponent]
})
export class TechnologyModule {
}
