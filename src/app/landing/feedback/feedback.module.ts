import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {FeedbackComponent} from './feedback.component';
import {Routes, RouterModule} from '@angular/router';

const route: Routes = [{
  path: '',
  component: FeedbackComponent
}];

@NgModule({
  imports: [
    CommonModule,
    RouterModule.forChild(route)
  ],
  declarations: [FeedbackComponent]
})
export class FeedbackModule {
}
