import {Component, OnInit} from '@angular/core';
import {Router} from '@angular/router';
import {ToastrService} from 'ngx-toastr';

import {SchoolService} from '../../../../shared/services/school.service';
import {ClassService} from '../../../../shared/services/class.service';
import {SessionService} from '../../../../shared/services/session.service';
import * as moment from 'moment';

const ls = localStorage;

@Component({
  selector: 'app-school-admin-master-entry-fee',
  templateUrl: './school-admin-master-entry-fee.component.html',
  styleUrls: ['./school-admin-master-entry-fee.component.scss']
})
export class SchoolAdminMasterEntryFeeComponent implements OnInit {
  schoolData = {
    _id: ''
  };
  userData = JSON.parse(ls.getItem('userData'));
  classData = [];
  sessionData = [];
  selectedClass = '';
  selectedSession = '';
  feeRow = {
    sessionId: '',
    schoolId: '',
    classId: '',
    feeData: {
      particular: '',
      amount: 0,
      dueDate: 7,
      type: 'monthly',
      months: []
    },
    createdById: '',
    isEdit: true
  };
  feesData = [];
  feeTypes = ['admission', 'monthly'];
  isDisable = false;

  constructor(private router: Router,
              private school: SchoolService,
              private session: SessionService,
              private cls: ClassService,
              private alert: ToastrService) {
  }

  ngOnInit() {
    if (this.userData && this.userData._id) {
      this.school.getSchoolByLoginId(this.userData._id.toString())
        .map(x => x.json())
        .subscribe(res => {
          console.log('res', res);
          if (res && res.data && res.data._id) {
            this.schoolData = res.data;
            this.cls.getClassBySchoolId(this.schoolData._id.toString())
              .map(x => x.json())
              .subscribe(res2 => {
                console.log('res2', res2);
                if (res2.data && res2.data.length) {
                  this.classData = res2.data;
                } else {
                  this.alert.info('No class information. Add a class to continue!');
                  this.router.navigate(['/school/admin/master/class/add']);
                }
              });
            this.session
              .getSessionBySchoolId(this.schoolData._id.toString())
              .map(x => x.json())
              .subscribe(res3 => {
                console.log('res3', res3);
                if (res3.data && res3.data.length) {
                  this.sessionData = res3.data;
                  // .map(sesVal => {
                  //   sesVal.startDate = sesVal.startDate.year + '-' + sesVal.startDate.month + '-' + sesVal.startDate.day;
                  //   sesVal.startDate = moment(sesVal.startDate, 'YYYY-MM-DD');
                  //   sesVal.endDate = sesVal.endDate.year + '-' + sesVal.endDate.month + '-' + sesVal.endDate.day;
                  //   sesVal.endDate = moment(sesVal.endDate, 'YYYY-MM-DD');
                  //   return sesVal;
                  // });
                  this.selectedClass = ls.getItem('selectedClass');
                  this.selectedSession = ls.getItem('selectedSession');
                  if (this.selectedSession && this.selectedClass) {
                    this.onSessionSelect();
                  }
                } else {
                  this.alert.info('No session found. Add a session to continue!');
                  this.router.navigate(['/school/admin/master/session/add']);
                }
              });
          } else {
            this.alert.error('Not able to fetch school information!', 'Reload Page');
          }
        })
    }
  }

  getFeeInfo() {
    const schoolId = this.schoolData._id;
    const sessionId = this.selectedSession;
    const classId = this.selectedClass;
    if (schoolId && sessionId && classId) {
      this.school.getFees(schoolId, sessionId, classId)
        .map(x => x.json())
        .subscribe(res => {
          console.log('res', res);
          if (res.success) {
            this.feesData = res.data.map(function (val) {
              val.isEdit = false;
              return val;
            });
            if (!this.feesData.length) {
              this.addFeeRow();
            }
          }
        })
    } else {
      this.addFeeRow();
    }
  }

  addFeeRow() {
    const temp = JSON.parse(JSON.stringify(this.feeRow));
    this.feesData.push(temp);
  }

  save() {
    this.isDisable = true;
    let error = '';
    const isError = this.feesData.some(function (val, ind) {
      if (!val.feeData.particular) {
        error = 'Particular value missing in card ' + (ind + 1) + '!!';
      }
      return !val.feeData.particular;
    });
    if (isError) {
      this.alert.error(error, 'Fatal Error!!');
      this.isDisable = false;
      return;
    }
    const toSendData = this.feesData.map(val => {
      val.schoolId = this.schoolData._id;
      val.sessionId = this.selectedSession;
      val.classId = this.selectedClass;
      val.createdById = this.userData._id;
      return val;
    });
    console.log('feesData', toSendData);
    this.school.saveFees(toSendData)
      .map(x => x.json())
      .subscribe(res => {
        this.isDisable = false;
        if (res.success) {
          this.alert.success(res.message, 'Success!');
          this.getFeeInfo();
        } else {
          this.alert.error(res.error, 'Error!');
        }
      })

  }

  removeCard(i) {
    const confirmMsg = confirm('Sure?');
    if (confirmMsg) {
      this.feesData.splice(i, 1);
      this.save();
    }
  }

  editCard(data) {
    data.isEdit = true;
  }

  onSessionSelect() {
    ls.setItem('selectedSession', this.selectedSession);
    const sel = this.sessionData.find(value => {
      return value._id.toString() === this.selectedSession;
    });
    this.getAllMonths(sel.startDate.year + '-' + sel.startDate.month + '-' + sel.startDate.day);
    this.getFeeInfo();
  }

  onClassSelect() {
    ls.setItem('selectedClass', this.selectedClass);
    this.getFeeInfo();
  }

  getAllMonths(start) {
    const allMonths = [];
    const dateStart = moment(start, 'YYYY-MM-DD');
    for (let i = 0; i < 12; i++) {
      allMonths.push(dateStart.format('MMMM').toLowerCase());
      dateStart.add(1, 'month');
    }
    this.feesData.forEach(function (val) {
      val.feeData.months = allMonths.map(x => {
        return {
          name: x,
          selected: false
        };
      });
    });
    this.feeRow.feeData.months = allMonths.map(x => {
      return {
        name: x,
        selected: false
      };
    });
  }

}
