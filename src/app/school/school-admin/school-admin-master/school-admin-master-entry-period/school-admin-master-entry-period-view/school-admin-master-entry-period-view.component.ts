import {Component, OnInit} from '@angular/core';
import {Router} from '@angular/router';
import {ToastrService} from 'ngx-toastr';

import {SchoolService} from '../../../../../shared/services/school.service';
import {ClassService} from '../../../../../shared/services/class.service';
import {SessionService} from '../../../../../shared/services/session.service';

const ls = localStorage;

@Component({
  selector: 'app-school-admin-master-entry-period-view',
  templateUrl: './school-admin-master-entry-period-view.component.html',
  styleUrls: ['./school-admin-master-entry-period-view.component.scss']
})
export class SchoolAdminMasterEntryPeriodViewComponent implements OnInit {
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
  selectedClass = '';
  allPeriods = [];
  viewPerData = [];

  constructor(private router: Router,
              private school: SchoolService,
              private session: SessionService,
              private cls: ClassService,
              private alert: ToastrService) {
  }

  ngOnInit() {
    this.selectedClass = ls.getItem('selectedClass') || '';
    this.selectedSession = ls.getItem('selectedSession') || '';
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
            this.router.navigate(['/school/admin/master/session/view']);
          }
          this.getPeriods();
          this.cls.getClassBySchoolId(this.schoolData._id.toString())
            .map(x => x.json())
            .subscribe(res2 => {
              console.log('res2', res2);
              if (res2.data && res2.data.length) {
                this.classData = res2.data;
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

  getPeriods() {
    if (this.schoolData._id && this.selectedSession && this.selectedClass) {
      ls.setItem('selectedClass', this.selectedClass);
      ls.setItem('selectedSession', this.selectedSession);
      this.school.getPeriods(this.schoolData._id, this.selectedSession, this.selectedClass)
        .map(x => x.json())
        .subscribe(peRes => {
          console.log('peRes', peRes);
          if (peRes.success) {
            this.viewPerData = peRes.data.periods;
          } else {
            this.alert.info(peRes.message);
          }
        })
    }
  }

}

