import {Component, OnInit} from '@angular/core';
import * as shape from 'd3-shape';
import {ToastrService} from 'ngx-toastr';
import {StudentService} from '../../../shared/services/student.service';
import {SchoolService} from '../../../shared/services/school.service';
import {TeacherService} from '../../../shared/services/teacher.service';
import {NoticeService} from '../../../shared/services/notice.service';
import {StaffService} from '../../../shared/services/staff.service';
import {ExpensesService} from '../../../shared/services/expenses.service';
import {GSettingsService} from '../../../shared/services/g-settings.service';
import {colorSets} from '@swimlane/ngx-charts/release/utils/color-sets';
import {
  single,
  generateData
} from '../../../shared/chartData';

const ls = localStorage;

@Component({
  selector: 'app-school-accountant-dashboard',
  templateUrl: './school-accountant-dashboard.component.html',
  styleUrls: ['./school-accountant-dashboard.component.scss']
})

export class SchoolAccountantDashboardComponent implements OnInit {
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
  staffData = [];
  schoolData = {
    _id: '',
    currentSession: '',
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
  settingData = {
    _id: '',
    logo: 'assets/images/blank.png'
  };
  noticeData = [];
  studentCount = '';
  totalCollectedFees = 0;
  totalExpense = 0;

  constructor(private student: StudentService,
              private school: SchoolService,
              private teacher: TeacherService,
              private alert: ToastrService,
              private notice: NoticeService,
              private staff: StaffService,
              private settings: GSettingsService,
              private expense: ExpensesService) {
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
      .subscribe(stres => {
        if (stres && stres.data && stres.data._id) {
          this.staffData = stres.data;
          this.school.getSchoolById(stres.data.schoolId)
            .map(x => x.json())
            .subscribe(scres => {
              this.schoolData = scres.data;
              if (this.schoolData._id && this.schoolData.currentSession) {
                this.school.getTotalFeesCollected(this.schoolData._id, this.schoolData.currentSession)
                  .map(y => y.json())
                  .subscribe(feeRes => {
                    console.log('fees', feeRes);
                    this.totalCollectedFees = feeRes.data;
                  });
                this.notice.getNoticeBySchoolId(scres.data._id, 'accountants')
                  .map(y => y.json())
                  .subscribe(nres => {
                    console.log('notice', nres.data);
                    this.noticeData = nres.data;
                    console.log('notice', nres.data);
                  });
                this.student.getStudentsCount(scres.data._id)
                  .map(x => x.json())
                  .subscribe(stures => {
                    this.studentCount = stures.data;
                    console.log('stures', stures.data);
                  });
                this.getSchoolSettings();
                this.getExpenses();
              } else {
                this.alert.error('No Current Session!', 'Error'!);
              }
            })
        } else {
          this.alert.error('Error in fetching school data!', 'Error'!);
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

  getExpenses() {
    this.expense.getTotalExpenses(this.schoolData._id)
      .map(x => x.json())
      .subscribe(exres => {
        this.totalExpense = exres.data;
        console.log('exres', exres);
      })
  }
}
