import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {CarrerComponent} from './carrer.component';
import {Routes, RouterModule} from '@angular/router';
import {FormsModule} from '@angular/forms';

const route: Routes = [{
	path: '',
	component: CarrerComponent
}];

@NgModule({
	imports: [
	FormsModule,
	CommonModule,
	RouterModule.forChild(route)
	],
	
	declarations: [CarrerComponent]
})
export class CarrerModule {
}
