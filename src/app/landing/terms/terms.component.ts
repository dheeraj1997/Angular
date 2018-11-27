import {Component, OnInit} from '@angular/core';
import {Router, NavigationEnd} from '@angular/router';
import {GoogleAnalyticsEventsService} from '../../shared/services/google-analytics-events.service';

@Component({
	selector: 'app-terms',
	templateUrl: './terms.component.html',
	styleUrls: ['./terms.component.scss']
})
export class TermsComponent implements OnInit {

	constructor(public router: Router, public gaEvent: GoogleAnalyticsEventsService) {
	}

	ngOnInit() {
	}

	submitEvent(category, action, label?, value?) {
		this.gaEvent.emitEvent(category, action, label, value);
	}
}
