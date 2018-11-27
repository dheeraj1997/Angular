import {Component, OnInit} from '@angular/core';
import {Router, NavigationEnd} from '@angular/router';
import {GoogleAnalyticsEventsService} from '../../services/google-analytics-events.service';

declare let ga: Function;

@Component({
  selector: 'app-footer',
  templateUrl: './footer.component.html',
  styleUrls: ['./footer.component.scss']
})
export class FooterComponent implements OnInit {
 
  footerRowNew = [
  {
    name: 'About',
    state: '/about'
  },
  {
    name: 'Career',
    state: '/career'
  }, {
    name: 'Connect',
    state: '/connect'
  }
  ];
  footerRowNew2 = [
  {
    name: 'Blog',
    state: '/'
  },
  {
    name: 'FAQ',
    state: '/'
  }, {
    name: 'Technologies',
    state: '/technology'
  }
  ];
  footerRowNew1 = [
  {
    name: 'Privacy Policy',
    state: '/privacy'
  },
  {
    name: 'Data Policy',
    state: '/data'
  }, {
    name: 'Terms & Condition',
    state: '/terms'
  }
  ];

  constructor(public router: Router,
    public gaEvent: GoogleAnalyticsEventsService) {
  }

  ngOnInit() {
  }

  submitEvent(category, action, label?, value?) {
    this.gaEvent.emitEvent(category, action, label, value);
  }
}
