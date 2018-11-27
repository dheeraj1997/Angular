import {Component , OnInit} from '@angular/core';
import * as shape from 'd3-shape';
import {GoogleAnalyticsEventsService} from '../../../shared/services/google-analytics-events.service';
import {colorSets} from '@swimlane/ngx-charts/release/utils/color-sets';
import {
  single,
  generateData
} from '../../../shared/chartData';

@Component({
  selector: 'app-admin-employee-dashboard',
  templateUrl: './admin-employee-dashboard.component.html',
  styleUrls: ['./admin-employee-dashboard.component.scss']
})
export class AdminEmployeeDashboardComponent implements OnInit{
  single: any[];
  graph: {
    links: any[],
    nodes: any[]
  };
  dateData: any[];
  // options
  showXAxis = true;
  showYAxis = true;
  gradient = false;
  showLegend = false;
  showXAxisLabel = false;
  tooltipDisabled = false;
  xAxisLabel = 'Country';
  showYAxisLabel = false;
  yAxisLabel = 'GDP Per Capita';
  showGridLines = true;
  roundDomains = false;
  colorScheme = {
    domain: [
    '#0099cc', '#2ECC71', '#4cc3d9', '#ffc65d', '#d96557', '#ba68c8'
    ]
  };
  schemeType = 'ordinal';
  // line interpolation
  curve = shape.curveLinear;
  // line, area
  timeline = false;
  // margin
  margin = false;
  marginTop = 40;
  marginRight = 40;
  marginBottom = 40;
  marginLeft = 40;
  // gauge
  gaugeMin = 0;
  gaugeMax = 50;
  gaugeLargeSegments = 10;
  gaugeSmallSegments = 5;
  gaugeTextValue = '';
  gaugeUnits = 'alerts';
  gaugeAngleSpan = 240;
  gaugeStartAngle = -120;
  gaugeShowAxis = true;
  gaugeValue = 50; // linear gauge value
  gaugePreviousValue = 70;

  constructor(public gaEvent: GoogleAnalyticsEventsService) {
    Object.assign(this, {
      single
    });
    this.dateData = generateData(5, false);
  }
  ngOnInit(){
    
  }
  select(data) {
    console.log('Item clicked', data);
  }

  onLegendLabelClick(entry) {
    console.log('Legend clicked', entry);
  }

  submitEvent(category, action, label?, value?) {
    this.gaEvent.emitEvent(category, action, label, value);
  }
}
