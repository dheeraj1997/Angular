import {Component, OnInit} from '@angular/core';
import {Router} from '@angular/router';
import {ToastrService} from 'ngx-toastr';
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
import {single, multi, generateData} from '../../../shared/chartData';
import {ExpensesService} from '../../../shared/services/expenses.service';

const ls = localStorage;

@Component({
  selector: 'app-school-admin-dashboard',
  templateUrl: './school-admin-dashboard.component.html',
  styleUrls: ['./school-admin-dashboard.component.scss']
})

export class SchoolAdminDashboardComponent implements OnInit {

  single: any[];
  multi: any[];
  // options
  showXAxis = true;
  showYAxis = true;
  gradient = false;
  showLegend = false;
  showXAxisLabel = true;
  tooltipDisabled = false;
  xAxisLabel = '';
  showYAxisLabel = true;
  yAxisLabel = 'GDP Per Capita';
  showGridLines = true;
  innerPadding = 0;
  barPadding = 1;
  groupPadding = 16;
  roundDomains = false;
  maxRadius = 2;
  minRadius = 1;

  colorScheme = {
    domain: [
      '#0099cc', '#2ECC71', '#4cc3d9'
    ]
  };
  schemeType = 'ordinal';


  userData = JSON.parse(ls.getItem('userData'));
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
    currentSession: '',
    smsCount: {
      used: 0,
      total: 0
    }
  };
  settingData = {
    _id: '',
    logo: 'assets/images/blank.png'
  };
  noticeData = [];
  attendanceSummery = [];
  totalStudent = 0;
  totalTeacher = 0;
  totalStaff = 0;
  noOfBooks = 0;
  totalSubject = 0;
  totalClass = 0;
  totalCollectedFees = 0;
  totalExpense = 0 ;
  constructor(private student: StudentService,
              private school: SchoolService,
              private teacher: TeacherService,
              private staff: StaffService,
              private router: Router,
              private alert: ToastrService,
              private notice: NoticeService,
              private settings: GSettingsService,
              private librarian: LibrarianService,
              private cls: ClassService,
              private subject: SubjectService,
              private expense : ExpensesService,) {
    Object.assign(this, {
      single,
      multi
    });
  }

  select(data) {
    console.log('Item clicked', data);
  }

  onLegendLabelClick(entry) {
    console.log('Legend clicked', entry);
  }

  ngOnInit() {
    this.userData = JSON.parse(ls.getItem('userData'));
    console.log('userData', this.userData);
    this.school.getSchoolByLoginId(this.userData._id.toString())
      .map(x => x.json())
      .subscribe(res => {
        if (res && res.data && res.data._id) {
          console.log('school id', res.data._id);
          console.log('school', res.data);
          this.schoolData = res.data;
          if (!this.schoolData.currentSession) {
            this.alert.info('No current session set. Select current session to continue!');
            this.router.navigate(['/school/admin/master/session/view']);
          }

          this.getSchoolSettings();
          this.getNoticeData();
          this.getTodayClassAttendanceSummery();
          this.getStaffCount();
          this.getTeacherCount();
          this.getStudentCount();
          this.getSubjectCount();
          this.getClassCount();
          this.getBooksCount();
          this.getFeeCollection();
          this.getExpenses();
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

  getTodayClassAttendanceSummery() {
    this.school.getTodayClassAttendanceSummery(this.schoolData._id, this.schoolData.currentSession)
      .map(x => x.json())
      .subscribe(res => {
        console.log('attendanceSummery', res);
        this.attendanceSummery = res.data;
      });
  }

  getTeacherCount() {
    this.teacher.getTeachersCount(this.schoolData._id)
      .map(x => x.json())
      .subscribe(resT => {
        this.totalTeacher = resT.data;
        console.log('totalTeacher', resT.data)
      });
  }

  getFeeCollection() {
    this.school.getTotalFeesCollected(this.schoolData._id, this.schoolData.currentSession)
      .map(y => y.json())
      .subscribe(feeRes => {
        console.log('fees', feeRes);
        this.totalCollectedFees = feeRes.data;
      });
  }

  getStaffCount() {
    this.staff.getStaffCount(this.schoolData._id)
      .map(x => x.json())
      .subscribe(resT => {
        this.totalStaff = resT.data;
        console.log('totalStaff', resT.data)
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

  getNoticeData() {
    this.notice.getNoticeBySchoolId(this.schoolData._id)
      .map(x => x.json())
      .subscribe(resN => {
        this.noticeData = resN.data;
        console.log('notice', resN.data)
      })
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
  getExpenses(){
    this.expense.getTotalExpenses(this.schoolData._id)
      .map(x => x.json())
      .subscribe(resB => {
        console.log('getExpense', resB);
        this.totalExpense = resB.data;
      })
  }
}
