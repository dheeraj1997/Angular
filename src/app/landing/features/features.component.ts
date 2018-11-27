import {Component, OnInit} from '@angular/core';
import {Router, NavigationEnd} from '@angular/router';
import {GoogleAnalyticsEventsService} from '../../shared/services/google-analytics-events.service';

declare let ga: Function;

@Component({
  selector: 'app-features',
  templateUrl: './features.component.html',
  styleUrls: ['./features.component.scss']
})
export class FeaturesComponent implements OnInit {

  constructor(public router: Router, public gaEvent: GoogleAnalyticsEventsService) {
  }

  ngOnInit() {
  }

  submitEvent(category, action, label?, value?) {
    this.gaEvent.emitEvent(category, action, label, value);
  }
}
