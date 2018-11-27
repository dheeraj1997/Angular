import {Component, OnInit} from '@angular/core';
import * as shape from 'd3-shape';
import {RouterModule} from '@angular/router';
import {StudentService} from '../../../shared/services/student.service';
import {SchoolService} from '../../../shared/services/school.service';
import {TeacherService} from '../../../shared/services/teacher.service';
import {StaffService} from '../../../shared/services/staff.service';
import {NoticeService} from '../../../shared/services/notice.service';
import {ClassService} from '../../../shared/services/class.service';
import {LibrarianService} from '../../../shared/services/librarian.service';
import {SubjectService} from '../../../shared/services/subject.service';
import {GSettingsService} from '../../../shared/services/g-settings.service';
import {colorSets} from '@swimlane/ngx-charts/release/utils/color-sets';
import {
  single,
  generateData
} from '../../../shared/chartData';

const ls = localStorage;

@Component({
  selector: 'app-school-teacher-dashboard',
  templateUrl: './school-teacher-dashboard.component.html',
  styleUrls: ['./school-teacher-dashboard.component.scss']
})

export class SchoolTeacherDashboardComponent implements OnInit {
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
  xAxisLabel = 'ashu';
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

  userData: {
    _id: '',
    username: ''
  };
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
  settingData = {
    _id: '',
    logo: 'assets/images/blank.png'
  };

  noticeData = [];
  teacherData = {
    _id: '',
  };
  totalStudent = 0;
  totalTeacher = 0;
  totalStaff = 0;
  noOfBooks = 0;
  totalSubject = 0;
  totalClass = 0;

  constructor(private student: StudentService,
              private school: SchoolService,
              private teacher: TeacherService,
              private staff: StaffService,
              private notice: NoticeService,
              private settings: GSettingsService,
              private librarian: LibrarianService,
              private cls: ClassService,
              private subject: SubjectService) {
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
    console.log('user', this.userData);
    this.teacher.getTeacherByLoginId(this.userData._id)
      .map(x => x.json())
      .subscribe(res => {
        if (res && res.data && res.data._id) {
          console.log('res', res);
          this.teacherData = res.data;
          this.school.getSchoolById(res.data.schoolId)
            .map(x => x.json())
            .subscribe(sres => {
              console.log('sres', sres);
              this.schoolData = sres.data;
              this.getSchoolSettings();
              this.getNotice();
              this.getStaffCount();
              this.getTeacherCount();
              this.getStudentCount();
              this.getSubjectCount();
              this.getClassCount();
              this.getBooksCount();
            })
        }
      })
  }

  getNotice() {
    this.notice.getNoticeBySchoolId(this.schoolData._id, 'teachers')
      .map(x => x.json())
      .subscribe(resN => {
        this.noticeData = resN.data;
        console.log('notice', resN.data);
      });
  }

  getSchoolSettings() {
    this.settings.getSettings(this.schoolData._id)
      .map(x => x.json())
      .subscribe(res => {
        console.log('getSettings', res);
        this.settingData = res.data;
      });
  }

  getSubjectCount() {
    this.subject.getSubjectsCount(this.schoolData._id)
      .map(x => x.json())
      .subscribe(resSu => {
        console.log('getSubjectCount', resSu);
        this.totalSubject = resSu.data;
      })
  }

  getClassCount() {
    this.cls.getClassesCount(this.schoolData._id)
      .map(x => x.json())
      .subscribe(resC => {
        console.log('getClassesCount', resC);
        this.totalClass = resC.data;
      })
  }

  getBooksCount() {
    this.librarian.getBookCount(this.schoolData._id)
      .map(x => x.json())
      .subscribe(resB => {
        console.log('getBooksCount', resB);
        this.noOfBooks = resB.data;
      })
  }

  getTeacherCount() {
    this.teacher.getTeachersCount(this.schoolData._id)
      .map(x => x.json())
      .subscribe(resT => {
        this.totalTeacher = resT.data;
        console.log('totalTeacher', resT.data)
      });
  }

  getStaffCount() {
    this.staff.getStaffCount(this.schoolData._id)
      .map(x => x.json())
      .subscribe(resT => {
        this.totalStaff = resT.data;
        console.log('totalTeacher', resT.data)
      });
  }

  getStudentCount() {
    this.student.getStudentsCount(this.schoolData._id)
      .map(x => x.json())
      .subscribe(resS => {
        console.log('getStudentsCount', resS);
        this.totalStudent = resS.data;
      });
  }
}
