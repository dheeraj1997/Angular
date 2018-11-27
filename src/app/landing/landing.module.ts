import {NgModule} from '@angular/core';
import {RouterModule} from '@angular/router';
import {CommonModule} from '@angular/common';
import {NgbModule} from '@ng-bootstrap/ng-bootstrap';
import {LandingComponent} from './landing.component';
import {LandingRoutes} from './landing.routing';
import {HeaderComponent} from '../shared/components/header/header.component';
import {FooterComponent} from '../shared/components/footer/footer.component';
import {FormsModule} from '@angular/forms';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    RouterModule.forChild(LandingRoutes),
    NgbModule
  ],

  declarations: [
    LandingComponent,
    HeaderComponent,
    FooterComponent
  ]
})

export class LandingModule {
}
