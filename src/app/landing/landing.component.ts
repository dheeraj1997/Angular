import {Component, OnInit} from '@angular/core';
import {Router, NavigationEnd} from '@angular/router';

declare let ga: Function;


@Component({
  selector: 'app-landing',
  templateUrl: './landing.component.html',
  styleUrls: ['./landing.component.scss']
})
export class LandingComponent implements OnInit {

  constructor(public router: Router) {
  }

  ngOnInit() {
  }

}

