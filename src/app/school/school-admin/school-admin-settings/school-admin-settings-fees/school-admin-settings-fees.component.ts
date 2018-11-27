import {Component, OnInit} from '@angular/core';
import {Router} from '@angular/router';
import {SchoolService} from '../../../../shared/services/school.service';
import {SessionService} from '../../../../shared/services/session.service';
import {GSettingsService} from '../../../../shared/services/g-settings.service';
import {ToastrService} from 'ngx-toastr';
import * as moment from 'moment';

const ls = localStorage;
const today = new Date();

@Component({
  selector: 'app-school-admin-settings-fees',
  templateUrl: './school-admin-settings-fees.component.html',
  styleUrls: ['./school-admin-settings-fees.component.scss']
})
export class SchoolAdminSettingsFeesComponent implements OnInit {
  userData = JSON.parse(ls.getItem('userData'));
  schoolData = {_id: '', currentSession: ''};
  sessionData = [];
  selectedSession = '';
  selectedSessionData = {
    startDate: {year: today.getFullYear(), month: today.getMonth() + 1, day: today.getDate()}
  };
  settingsData = {
    schoolId: '',
    feesSettings: {
      feeReceiptNo: 0,
      feeReceiptString: '',
      transportSettings: {months: []}
    }
  };

  constructor(private school: SchoolService,
              private session: SessionService,
              private setting: GSettingsService,
              private router: Router,
              private alert: ToastrService) {
  }

  ngOnInit() {
    this.userData = JSON.parse(ls.getItem('userData'));
    this.school.getSchoolByLoginId(this.userData._id.toString())
      .map(x => x.json())
      .subscribe(res => {
        console.log('getSchoolByLoginId res', res);
        if (res && res.data && res.data._id) {
          this.schoolData = res.data;
          if (this.schoolData.currentSession) {
            this.selectedSession = this.schoolData.currentSession;
          } else {
            this.alert.info('No current session selected!');
            this.router.navigate(['/school/admin/master/session/view']);
          }
          this.settingsData.schoolId = this.schoolData._id;
          console.log('this.selectedSession', this.selectedSession);
          console.log('schoolId', this.settingsData.schoolId);
          this.session.getSessionBySchoolId(this.schoolData._id)
            .map(x => x.json())
            .subscribe(sesRes => {
              console.log('sesRes', sesRes);
              if (sesRes.success && sesRes.data && sesRes.data.length) {
                this.sessionData = sesRes.data;
                this.selectedSessionData = this.sessionData.find(val => val._id.toString() === this.selectedSession.toString());
                console.log('this.selectedSessionData', this.selectedSessionData);
                if (this.selectedSessionData && this.selectedSessionData.startDate) {
                  const sendDate = this.selectedSessionData.startDate.year
                    + '-' + this.selectedSessionData.startDate.month + '-'
                    + this.selectedSessionData.startDate.day;
                  console.log('sendDate', sendDate);
                  this.getAllMonths(sendDate);
                }
              }
            });
          this.setting.getSettings(this.schoolData._id)
            .map(x => x.json())
            .subscribe(setRes => {
              console.log('setRes', setRes);
              if (setRes.success) {
                if (setRes.data) {
                  const temp = setRes.data;
                  if (!setRes.data.feesSettings) {
                    temp.feesSettings = this.settingsData.feesSettings;
                  }
                  this.settingsData = temp;
                }
              }
            });
          this.settingsData.schoolId = res.data._id;
          console.log('this.settingsData.schoolId', this.settingsData.schoolId);
        }

      })
  }

  getAllMonths(start) {
    const allMonths = [];
    const dateStart = moment(start, 'YYYY-MM-DD');
    for (let i = 0; i < 12; i++) {
      allMonths.push(dateStart.format('MMMM').toLowerCase());
      dateStart.add(1, 'month');
    }
    this.settingsData.feesSettings.transportSettings.months = allMonths.map(x => {
      return {
        name: x,
        selected: true
      };
    });
  }

  saveSetting() {
    if (
      this.settingsData.schoolId ||
      this.settingsData.feesSettings
    ) {
      console.log('settingsData', this.settingsData);
      this.setting.saveSettings(this.settingsData)
        .map(x => x.json())
        .subscribe(res => {
          this.alert.success(res.message, 'Success');
          console.log('settingsData', this.settingsData);
        })

    } else {
      this.alert.error('Required fields are empty!', 'Fatal Error!');
    }
  }
}
