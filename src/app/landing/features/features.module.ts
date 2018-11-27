import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {FeaturesComponent} from './features.component';
import {Routes, RouterModule} from '@angular/router';

const route: Routes = [{
  path: '',
  component: FeaturesComponent
}];

@NgModule({
  imports: [
    CommonModule,
    RouterModule.forChild(route)
  ],
  declarations: [FeaturesComponent]
})
export class FeaturesModule {
}
