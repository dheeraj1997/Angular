import {Component, OnInit} from '@angular/core';
import {Router} from '@angular/router';
import {ToastrService} from 'ngx-toastr';

import {SchoolService} from '../../../../../shared/services/school.service';
import {ClassService} from '../../../../../shared/services/class.service';
import {SessionService} from '../../../../../shared/services/session.service';

const ls = localStorage;

@Component({
  selector: 'app-school-admin-master-entry-period-add',
  templateUrl: './school-admin-master-entry-period-add.component.html',
  styleUrls: ['./school-admin-master-entry-period-add.component.scss']
})
export class SchoolAdminMasterEntryPeriodAddComponent implements OnInit {
  schoolData = {
    _id: '',
    currentSession: ''
  };
  userData = {
    _id: ''
  };
  classData = [];
  sessionData = [];
  selectedSession = '';
  periodData = {
    number: 0,
    startTime: {hour: 7, minute: 0},
    endTime: {hour: 8, minute: 0}
  };
  periodRow = {
    classData: [],
    totalPeriods: 0,
    list: []
  };
  allPeriods = [];
  isDisable = false;

  constructor(private router: Router,
              private school: SchoolService,
              private session: SessionService,
              private cls: ClassService,
              private alert: ToastrService) {
  }

  ngOnInit() {
    this.userData = JSON.parse(ls.getItem('userData'));
    this.school.getSchoolByLoginId(this.userData._id.toString())
      .map(x => x.json())
      .subscribe(res => {
        console.log('res', res);
        if (res && res.data && res.data._id) {
          this.schoolData = res.data;
          if (this.schoolData.currentSession) {
            this.selectedSession = this.schoolData.currentSession;
          } else {
            this.alert.error('No Current Session Selected. Please select current session.!', 'Error!');
            this.router.navigate(['/school/admin/master/session/add']);
          }
          this.cls.getClassBySchoolId(this.schoolData._id.toString())
            .map(x => x.json())
            .subscribe(res2 => {
              console.log('res2', res2);
              if (res2.data && res2.data.length) {
                this.classData = res2.data;
                this.periodRow.classData = res2.data.map(x => {
                  x.isSelected = false;
                  return x;
                });
                this.getExistingClasses();
              } else {
                this.alert.error('Not able to fetch class information!');
              }
            });
          this.session
            .getSessionBySchoolId(this.schoolData._id.toString())
            .map(x => x.json())
            .subscribe(res3 => {
              console.log('res3', res3);
              if (res3.data && res3.data.length) {
                this.sessionData = res3.data;
              } else {
                this.alert.error('Not able to fetch session information!');
              }
            });
        } else {
          this.alert.error('Not able to fetch school information!', 'Reload Page');
        }
      })
  }

  getExistingClasses() {
    this.school.getSchoolPeriodClasses(this.schoolData._id.toString(), this.schoolData.currentSession)
      .map(x => x.json())
      .subscribe(res => {
        console.log('getExistingClasses res', res);
        if (res.success) {
          const allExistingClass = res.data.map(val => val.classId.toString());
          this.periodRow.classData = this.periodRow.classData.filter(val => {
            return allExistingClass.indexOf(val._id.toString()) === -1;
          });
          this.addPeriod();
        }
      })
  }

  addPeriod() {
    this.allPeriods.push(JSON.parse(JSON.stringify(this.periodRow)));
  }

  checkClassAvailability(e, clsId, perInd) {
    // console.log('e', e);
    // console.log('clsId', clsId);
    if (e) {
      this.periodRow.classData = this.periodRow.classData.filter(function (val) {
        console.log('val._id', val._id);
        return val._id !== clsId;
      });
      this.allPeriods.forEach((per, ind) => {
        if (ind !== perInd) {
          per.classData = per.classData.filter(function (val) {
            return val._id !== clsId;
          });
        }
      })
    } else {
      const thisClass = this.classData.find(val => {
        return val._id === clsId;
      });
      this.periodRow.classData.push(thisClass);
      this.allPeriods.forEach((per, ind) => {
        if (ind !== perInd) {
          per.classData.push(thisClass);
        }
      })
    }
  }

  addPeriodList(e, period) {
    // console.log('e', e);
    // console.log('period', period);
    period.list = [];
    if (e && typeof e === 'number') {
      for (let i = 1; i <= e; i++) {
        const temp = JSON.parse(JSON.stringify(this.periodData));
        temp.number = i;
        temp.startTime.hour += i;
        temp.endTime.hour += i;
        period.list.push(temp);
      }
    }

  }

  save() {
    this.isDisable = true;
    if (!this.selectedSession) {
      this.alert.error('Empty Session Fields');
    }
    console.log('this.allPeriods', this.allPeriods);
    const toSubmitData = this.allPeriods.reduce((a, p) => {
      p.classData.forEach(val => {
        if (val.isSelected) {
          a.push({
            schoolId: this.schoolData._id,
            sessionId: this.selectedSession,
            classId: val._id,
            totalPeriods: p.totalPeriods,
            periods: p.list,
            createdById: this.userData._id
          })
        }
      });
      return a;
    }, []);
    console.log('toSubmitData', toSubmitData);

    this.school.savePeriod(toSubmitData)
      .map(x => x.json())
      .subscribe(res => {
        console.log('res', res);
        if (res.success) {
          this.alert.success(res.message, 'Success!!');
        }

      });
  }

}
