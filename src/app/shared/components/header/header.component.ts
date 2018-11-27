import {Component, OnInit} from '@angular/core';
import {Router, NavigationEnd} from '@angular/router';
import {GoogleAnalyticsEventsService} from '../../services/google-analytics-events.service';

declare let ga: Function;

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss']
})
export class HeaderComponent implements OnInit {
  headerMenuItems = [{
    name: 'Home',
    state: '/home'
  }, {
    name: 'About Us',
    state: '/about'
  }, {
    name: 'Features',
    state: '/features'
  }, {
    name: 'Clients',
    state: '/our-clients'
  }, {
    name: 'Connect',
    state: '/connect'
  }];
  isIn = false;   // store state

  constructor(public router: Router, public gaEvent: GoogleAnalyticsEventsService) {
  }

  ngOnInit() {
  }

  toggleState() { // click handler
    this.isIn = !this.isIn;
  }


  submitEvent(category, action, label?, value?) {
    this.gaEvent.emitEvent(category, action, label, value);
  }

}
