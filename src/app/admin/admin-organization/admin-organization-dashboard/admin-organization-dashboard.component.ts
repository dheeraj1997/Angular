import {Component, OnInit} from '@angular/core';
import * as shape from 'd3-shape';
import {GoogleAnalyticsEventsService} from '../../../shared/services/google-analytics-events.service';
import {colorSets} from '@swimlane/ngx-charts/release/utils/color-sets';
import {
  single,
  generateData
} from '../../../shared/chartData';
@Component({
  selector: 'app-admin-organization-dashboard',
  templateUrl: './admin-organization-dashboard.component.html',
  styleUrls: ['./admin-organization-dashboard.component.scss']
})
export class AdminOrganizationDashboardComponent implements OnInit {

  constructor(public gaEvent: GoogleAnalyticsEventsService) {
    
    
  }
  ngOnInit(){

  }

  
}
