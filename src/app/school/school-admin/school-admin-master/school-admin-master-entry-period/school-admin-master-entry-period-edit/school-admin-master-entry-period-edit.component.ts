import {Component, OnInit} from '@angular/core';
import {Router} from '@angular/router';
import {ToastrService} from 'ngx-toastr';
import {SchoolService} from '../../../../../shared/services/school.service';
import {ClassService} from '../../../../../shared/services/class.service';

const ls = localStorage;

@Component({
  selector: 'app-school-admin-master-entry-period-edit',
  templateUrl: './school-admin-master-entry-period-edit.component.html',
  styleUrls: ['./school-admin-master-entry-period-edit.component.scss']
})
export class SchoolAdminMasterEntryPeriodEditComponent implements OnInit {
  schoolData = {
    _id: ''
  };
  userData = JSON.parse(ls.getItem('userData'));
  classData = [];
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


  constructor(private router: Router,
              private school: SchoolService,
              private cls: ClassService,
              private alert: ToastrService) {
  }

  ngOnInit() {
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
                this.periodRow.classData = res2.data.map(x => {
                  x.isSelected = false;
                  return x;
                });
                this.addPeriod();
              } else {
                this.alert.error('Not able to fetch class information!');
              }
            });
        } else {
          this.alert.error('Not able to fetch school information!', 'Reload Page');
        }
      })
  }

  addPeriod() {
    this.allPeriods.push(JSON.parse(JSON.stringify(this.periodRow)));
  }

  checkClassAvailability(e, clsId, perInd) {
    console.log('e', e);
    console.log('clsId', clsId);
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
    console.log('e', e);
    console.log('period', period);
    period.list = [];
    if (e) {
      for (let i = 1; i <= e; i++) {
        const temp = JSON.parse(JSON.stringify(this.periodData));
        temp.number = i;
        period.list.push(temp);
      }
    }

  }

  save() {
    console.log('save clicked');
  }

}
