import {Component, OnInit} from '@angular/core';
import * as shape from 'd3-shape';
import {RouterModule} from '@angular/router';
import {colorSets} from '@swimlane/ngx-charts/release/utils/color-sets';
import {single, generateData} from '../../../shared/chartData';
import {SchoolService} from '../../../shared/services/school.service';
import {NoticeService} from '../../../shared/services/notice.service';
import {LibrarianService} from '../../../shared/services/librarian.service';
import {StaffService} from '../../../shared/services/staff.service';
import {GSettingsService} from '../../../shared/services/g-settings.service';

const ls = localStorage;

@Component({
  selector: 'app-school-librarian-dashboard',
  templateUrl: './school-librarian-dashboard.component.html',
  styleUrls: ['./school-librarian-dashboard.component.scss']
})
export class SchoolLibrarianDashboardComponent implements OnInit {
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

  userData = JSON.parse(ls.getItem('userData'));
  staffData = {};
  schoolData = {
    _id: '',
    name: '',
    address: {
      village: '',
      block: '',
      district: '',
      state: '',
      country: 'India',
      pin: '',
      completeAddress: ''
    },
  };
  noticeData: {};
  bookCount = 0;
  issuedBookCount = 0;
  returnBookCount = 0;
  settingData = {
    _id: '',
    logo: 'assets/images/blank.png'
  };
  constructor(private librairan: LibrarianService,
    private school: SchoolService,
    private staff: StaffService,
    private settings: GSettingsService,
    private notice: NoticeService) {
    Object.assign(this, {
      single
    });
    this.dateData = generateData(5, false);
  }

  select(data) {
    console.log('Item clicked', data);
  }

  onLegendLabelClick(entry) {
    console.log('Legend clicked', entry);
  }

  ngOnInit() {
    this.userData = JSON.parse(ls.getItem('userData'));
    this.staff.getStaffByLoginId(this.userData._id.toString())
    .map(x => x.json())
    .subscribe(sres => {
      if (sres && sres.data && sres.data._id) {
        this.staffData = sres.data;
        console.log('sres', sres.data);
        this.school.getSchoolById(sres.data.schoolId)
        .map(x => x.json())
        .subscribe(scres => {
          this.schoolData = scres.data;
          console.log('scres', scres.data);
          this.notice.getNoticeBySchoolId(scres.data._id, 'librarians')
          .map(x => x.json())
          .subscribe(nres => {
            this.noticeData = nres.data;
            console.log('nres', nres);
          });

          this.librairan.getBookCount(scres.data._id)
          .map(x => x.json())
          .subscribe(bcount => {
            this.bookCount = bcount.data;
            console.log('book', bcount);
          });

          this.librairan.getIssueBookCount(scres.data._id)
          .map(x => x.json())
          .subscribe(ibcount => {
            this.issuedBookCount = ibcount.data;
            console.log('isbook', ibcount);
          });
          this.librairan.getReturnBookCount(scres.data._id)
          .map(x => x.json())
          .subscribe(rbcount => {
            this.returnBookCount = rbcount.data;
            console.log('rebook', rbcount);
          });
          this.getSchoolSettings();

        })
      }
    })
  }
  getSchoolSettings() {
    this.settings.getSettings(this.schoolData._id)
      .map(x => x.json())
      .subscribe(res => {
        console.log('getSettings', res);
        this.settingData = res.data;
      });
  }
}
