import {Component, OnInit} from '@angular/core';
import {Router, NavigationEnd} from '@angular/router';
import {GoogleAnalyticsEventsService} from '../../shared/services/google-analytics-events.service';

declare let ga: Function;

@Component({
  selector: 'app-connect',
  templateUrl: './connect.component.html',
  styleUrls: ['./connect.component.scss']
})
export class ConnectComponent implements OnInit {

  constructor(public router: Router, public gaEvent: GoogleAnalyticsEventsService) {
  }

  ngOnInit() {
  }

  submitEvent(category, action, label?, value?) {
    this.gaEvent.emitEvent(category, action, label, value);
  }

}
